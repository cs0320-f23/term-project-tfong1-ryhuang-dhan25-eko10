from flask import Flask, jsonify, request
from flask_caching import Cache
import pinecone
from gensim.models.doc2vec import Doc2Vec,\
    TaggedDocument
from nltk.tokenize import word_tokenize
import nltk
import redis
from kd_tree import KD_Tree
import json
from numpyencoder import NumpyEncoder

nltk.download('punkt')

app = Flask(__name__)

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

vector_dim = 20

model = Doc2Vec(vector_size=vector_dim,
                min_count=2, epochs=50)

mock = ["In recent decades, mass spectrometry-based lipidomics has provided a fertile environment for scientific investigations of biochemical and mechanistic processes in biological systems. Notably, this approach has been used to characterize physiological and pathological processes relevant to the central nervous system by identifying changes in the sphingolipid content in the brain, cerebral spinal fluid, and blood plasma. However, despite a preponderance of studies identifying correlations between specific lipids and disease progression, this powerful resource has not yet substantively translated into clinically useful diagnostic assays. Part of this gap may be explained by insufficient depth of the lipidomic profiles in many studies, by lab-to-lab inconsistencies in methodology, and a lack of absolute quantification.",
        "Bromhidrosis is characterized as a chronic condition related to malodor from the skin. The underlying etiology is from bacterial decompositions of glandular secretion products. However, specific pathways and metabolites for the disease are yet to be investigated. Here, twenty-eight metabolites, including fifteen major sweat constituents and thirteen compounds emitted from malodor-producing skin bacteria, were subjected to the metabometric analysis using Metaboanalyst. Different pathways in the butanoate metabolism revealed that acetolactate synthase (ALS) in skin Staphylococcus epidermidis (S. epidermidis) bacteria are catalyzing pyruvate to several malodor compounds like diacetyl. In the docking studies of the sulfonylurea-ALS interaction, five selected sulfonylureas, which originally were developed for the treatment of diabetes mellitus type 2, showed different binding free energies (ΔG) from chlorimuron ethyl-a well-known ALS sulfonylurea inhibitor. Amongst five sulfonylureas, gliquidone and glisoxepide were found to have free energy differences that were lower than or equal to chlorimuron ethyl, revealing their high affinities to ALS. In the future, further investigations of gliquidone and glisoxepide against ALS in skin bacteria would be crucial in repurposing these two sulfonylureas as new anti-bromhidrosis drugs.",
        "Endogenous alcohol produced by the gut microbiome is transported via the bloodstream to the liver for detoxification. Gut dysbiosis can result in chronic excess alcohol production that contributes to the development of hepatic steatosis. The aim of this study was to examine whether linolenic acid can manipulate the production of harmful alcohol and beneficial short-chain fatty acids (SCFAs) in the metabolome of commensal Klebsiella pneumoniae (K. pneumoniae) and the virulent K. pneumoniae K1 serotype. Glucose fermentation by the K. pneumoniae K1 serotype yielded increased production of alcohol and decreased SCFAs (especially acetate and propionate) compared to those of commensal K. pneumoniae. However, the use of linolenic acid instead of glucose significantly reduced alcohol and increased SCFAs in the fermentation media of the K. pneumoniae K1 serotype. The work highlights the value of shaping the microbial metabolome using linolenic acid, which can potentially regulate the gut–liver axis for the prevention and treatment of alcohol-induced liver diseases.",
        "intro software engineering at brown cs32; very fun"]
    
tagged_data = [TaggedDocument(words=word_tokenize(doc.lower()),
                              tags=[str(i)]) for i, doc in enumerate(mock)]
model.build_vocab(tagged_data)
model.train(tagged_data,
                total_examples=model.corpus_count,
                epochs=model.epochs)
    
 
# get the document vectors
document_vectors = [model.infer_vector(
        word_tokenize(doc.lower())) for doc in mock]
 
embeddings = []
#  print the document vectors
for i, doc in enumerate(mock):
    embeddings.append(document_vectors[i])

kd_tree = KD_Tree(embeddings, vector_dim)

@app.route('/pinecone/<query>')
@cache.cached(timeout=50)
def cosine_similarity(query):
    if kd_tree is None:
        return {"message": "tree not found"}
    else:
        query_embedding = model.infer_vector(word_tokenize(query.lower()))
        k_nearest = kd_tree.kNN(query_embedding, 4)
        json_dump = json.dumps({"message" : k_nearest}, cls=NumpyEncoder)
        return json_dump

    
    
    # # Load Pinecone API key
    # api_key = '5bc96521-faae-4066-9a18-d74060e3ac1d'
    # # Set Pinecone environment. Find next to API key in console
    # env = "gcp-starter"

    # # Initialize connection to pinecone
    # pinecone.init(
    #     api_key=api_key,
    #     environment=env
    # )

    # # Index params
    # my_index_name = "doc-similarity"

    # if my_index_name not in pinecone.list_indexes():
    #     # Create the index
    #     pinecone.create_index(name = my_index_name,
    #                         dimension=vector_dim,
    #                         metric="cosine", shards=1,
    #                         pod_type='s1.x1')
    # # Connect to the index
    # my_index = pinecone.Index(index_name = my_index_name)

    # # docIDs = [1, 2, 3, 4]
    # # data = list(zip(docIDs, embeddings))
    # # Upload the final data
    # my_index.upsert(vectors = [
    #     ("A", embeddings[0].tolist()),
    #     ("B", embeddings[1].tolist()),
    #     ("C", embeddings[2].tolist()),
    #     ("D", embeddings[3].tolist())
    # ])

    # a = query
    # query = model.infer_vector(word_tokenize(a.lower()))
    # response = my_index.query(query.tolist(), top_k=4)

    # return response.to_dict()

    

if __name__ == "__main__":
    app.run(port=5000)