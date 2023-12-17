from flask import Flask, jsonify, request
from flask_caching import Cache
from gensim.models.doc2vec import Doc2Vec,\
    TaggedDocument
from nltk.tokenize import word_tokenize
import nltk
import redis
from kd_tree import KD_Tree
import json
from numpyencoder import NumpyEncoder
from vector_lookup import VectorLookup

nltk.download('punkt')

# The backend should include appropriate CORS headers in its responses to explicitly allow requests from the front end's domain.
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# redis caching
# app.config['CACHE_TYPE'] = 'redis'
# app.config['CACHE_KEY_PREFIX'] = 'your_prefix_'  # Customize this prefix
# app.config['CACHE_REDIS_URL'] = 'redis://localhost:6379/0'  # Adjust the Redis connection URL as needed

config = {
    "DEBUG": True,          # some Flask specific configs
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 300
}
app.config.from_mapping(config)
cache = Cache(app)

vector_dim = 30

model = Doc2Vec(vector_size=vector_dim,
                min_count=2, epochs=50, seed=42)

mock = ["In recent decades, mass spectrometry-based lipidomics has provided a fertile environment for scientific investigations of biochemical and mechanistic processes in biological systems. Notably, this approach has been used to characterize physiological and pathological processes relevant to the central nervous system by identifying changes in the sphingolipid content in the brain, cerebral spinal fluid, and blood plasma. However, despite a preponderance of studies identifying correlations between specific lipids and disease progression, this powerful resource has not yet substantively translated into clinically useful diagnostic assays. Part of this gap may be explained by insufficient depth of the lipidomic profiles in many studies, by lab-to-lab inconsistencies in methodology, and a lack of absolute quantification.",
        "Bromhidrosis is characterized as a chronic condition related to malodor from the skin. The underlying etiology is from bacterial decompositions of glandular secretion products. However, specific pathways and metabolites for the disease are yet to be investigated. Here, twenty-eight metabolites, including fifteen major sweat constituents and thirteen compounds emitted from malodor-producing skin bacteria, were subjected to the metabometric analysis using Metaboanalyst. Different pathways in the butanoate metabolism revealed that acetolactate synthase (ALS) in skin Staphylococcus epidermidis (S. epidermidis) bacteria are catalyzing pyruvate to several malodor compounds like diacetyl. In the docking studies of the sulfonylurea-ALS interaction, five selected sulfonylureas, which originally were developed for the treatment of diabetes mellitus type 2, showed different binding free energies (ΔG) from chlorimuron ethyl-a well-known ALS sulfonylurea inhibitor. Amongst five sulfonylureas, gliquidone and glisoxepide were found to have free energy differences that were lower than or equal to chlorimuron ethyl, revealing their high affinities to ALS. In the future, further investigations of gliquidone and glisoxepide against ALS in skin bacteria would be crucial in repurposing these two sulfonylureas as new anti-bromhidrosis drugs.",
        "Endogenous alcohol produced by the gut microbiome is transported via the bloodstream to the liver for detoxification. Gut dysbiosis can result in chronic excess alcohol production that contributes to the development of hepatic steatosis. The aim of this study was to examine whether linolenic acid can manipulate the production of harmful alcohol and beneficial short-chain fatty acids (SCFAs) in the metabolome of commensal Klebsiella pneumoniae (K. pneumoniae) and the virulent K. pneumoniae K1 serotype. Glucose fermentation by the K. pneumoniae K1 serotype yielded increased production of alcohol and decreased SCFAs (especially acetate and propionate) compared to those of commensal K. pneumoniae. However, the use of linolenic acid instead of glucose significantly reduced alcohol and increased SCFAs in the fermentation media of the K. pneumoniae K1 serotype. The work highlights the value of shaping the microbial metabolome using linolenic acid, which can potentially regulate the gut–liver axis for the prevention and treatment of alcohol-induced liver diseases.",
        "Differential privacy is often studied under two different models of neighboring datasets: the add- remove model and the swap model. While the swap model is used extensively in the academic literature, many practical libraries use the more conservative add-remove model. However, analysis under the add- remove model can be cumbersome, and obtaining results with tight constants requires some additional work. Here, we study the problem of one-dimensional mean estimation under the add-remove model of differential privacy. We propose a new algorithm and show that it is min-max optimal, that it has the correct constant in the leading term of the mean squared error, and that this constant is the same as the optimal algorithm in the swap model. Our results show that, for mean estimation, the add-remove and swap model give nearly identical error even though the add-remove model cannot treat the size of the dataset as public information. In addition, we demonstrate empirically that our proposed algorithm yields a factor of two improvement in mean squared error over algorithms often used in practice.",
        "We introduce Onflow, a reinforcement learning technique that enables online optimization of portfolio allocation policies based on gradient flows. We devise dynamic allocations of an investment portfolio to maximize its expected log return while taking into account transaction fees. The portfolio allocation is parameterized through a softmax function, and at each time step, the gradient flow method leads to an ordinary differential equation whose solutions correspond to the updated allocations. This algorithm belongs to the large class of stochastic optimization procedures; we measure its efficiency by comparing our results to the mathematical theoretical values in a log-normal framework and to standard benchmarks from the 'old NYSE' dataset. For log-normal assets, the strategy learned by Onflow, with transaction costs at zero, mimics Markowitz's optimal portfolio and thus the best possible asset allocation strategy. Numerical experiments from the 'old NYSE' dataset show that Onflow leads to dynamic asset allocation strategies whose performances are: a) comparable to benchmark strategies such as Cover's Universal Portfolio or Helmbold et al. multiplicative updates approach when transaction costs are zero, and b) better than previous procedures when transaction costs are high. Onflow can even remain efficient in regimes where other dynamical allocation techniques do not work anymore. Therefore, as far as tested, Onflow appears to be a promising dynamic portfolio management strategy based on observed prices only and without any assumption on the laws of distributions of the underlying assets' returns. In particular it could avoid model risk when building a trading strategy."]

tagged_data = [TaggedDocument(words=word_tokenize(doc.lower()),
                              tags=[str(i)]) for i, doc in enumerate(mock)]
model.build_vocab(tagged_data)
model.train(tagged_data,
                total_examples=model.corpus_count,
                epochs=model.epochs)

lookup = VectorLookup()
lookup.change_database('backend/data/vector_database_80000_cleaned.pickle')

embeddings = lookup.return_all_vectors()
labels = lookup.return_all_doi_labels()

kd_tree = KD_Tree(embeddings, vector_dim, labels)

# example usage: http://127.0.0.1:5000/knn?query=western%20blot&k=20
@app.route('/knn')
@cache.cached(timeout=50, query_string=True)
def cosine_similarity():
    query = request.args.get('query')
    k = int(request.args.get('k'))
    if kd_tree is None:
        return {"result": "data not found", "type": "datasource_error"}
    else:
        query_embedding = model.infer_vector(word_tokenize(query.lower()))
        k_nearest = kd_tree.kNN(query_embedding, k)
        data = lookup.find_doi_info(k_nearest)
        json_dump = json.dumps({"result" : data, "type" : "success"}, ensure_ascii=False, cls=NumpyEncoder)
        return json_dump

if __name__ == "__main__":
    app.run(port=5000)