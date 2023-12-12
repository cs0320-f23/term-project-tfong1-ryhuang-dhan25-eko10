from gensim.models.doc2vec import Doc2Vec,\
    TaggedDocument
from nltk.tokenize import word_tokenize
import nltk
import redis
import pandas as pd
import os
import numpy as np
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

def split_data(abstracts_array, num_splits, func):
    batch_size = len(abstracts_array//num_splits)
    for i in range(num_splits):
        result = lambda x: func(x)
        results = result(abstracts_array[batch_size*i:batch_size*(i+1)])
    return results

def create_embeddings(filepath):
    papers = pd.read_csv(filepath)
    abstracts = papers[['Abstract']]
    titles = papers[['Title']].astype(str).values
    dois = papers[['Ids']]
    topics = papers[['Topics']]
    topics_10 = topics[:100000]

    abstracts = abstracts.astype(str).values.tolist()
    title_abstract = titles + ' [SEP] ' + abstracts
    title_abstract_10 = title_abstract[:100000]
    dois_10 = dois[:100000]

    
    tagged_data = [TaggedDocument(words=word_tokenize(doc[0].lower()),
                  tags=[str(i)]) for i, doc in enumerate(title_abstract_10)]
    
    vector_dim = 30

    model = Doc2Vec(vector_size=vector_dim,
                min_count=2, epochs=25)
    model.build_vocab(tagged_data)
    model.train(tagged_data,
                total_examples=model.corpus_count,
                epochs=model.epochs)
 
    # get the document vectors
    document_vectors = [model.infer_vector(
        word_tokenize(doc[0].lower())) for doc in title_abstract_10]
 
    embeddings = []
    #  print the document vectors
    for i, doc in enumerate(title_abstract_10):
        embeddings.append(document_vectors[i])

    docIDs = range(0, len(embeddings))
    # data = list(zip(docIDs, embeddings))
    # Upload the final data
    # embeddings = np.zeros((1, 768))
    # model = SentenceTransformer("neuml/pubmedbert-base-embeddings")
    # for entry in title_abstract:
    #     embeddings= np.concatenate((embeddings, model.encode(entry)), axis=0)
    # print(embeddings)
    return embeddings, dois_10, topics_10

paper_df = None
directory = "/Users/davidhan67/Downloads/csv_docs"
for filename in tqdm(os.listdir(directory)):
    if filename.endswith('csv'):
        print(filename)
        file = os.path.join(directory, filename)
        embeds, dois, topics = create_embeddings(file)
        print(dois, topics)

        items = {'Vectors': embeds}
        if paper_df is None:
            paper_df = pd.DataFrame(items, index=list(range(len(embeds))))
            paper_df['DOIs'] = dois
            paper_df['Topics']= topics

        else:
            new_df = pd.DataFrame(items, index=list(range(len(embeds))))
            new_df['DOIs'] = dois
            new_df['Topics']= topics
            paper_df = pd.concat([paper_df, new_df],ignore_index=True)
        print(paper_df.head())

#Gets rid of papers in the database that don't have a title
paper_df.dropna(axis=0, inplace = True)

paper_df.to_pickle('vector_database_80000.pickle')
