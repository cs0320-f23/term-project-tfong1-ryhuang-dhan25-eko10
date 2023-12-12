import pandas as pd
import requests
import json

class VectorLookup:
    def __init__(self) -> None:
        self.database: pd.DataFrame = None
        self.query = None
        self.vectors = []
    
    def change_database(self, filename: str):
        try:
            self.database = pd.read_pickle(filename)
            self.database = self.database.set_index('DOIs')
            print('success!')
            return self.database
        except:
            print("failed to find database")
            return None
        
    # def clean_database(self, filename):
    #     self.database = pd.read_pickle(filename)
    #     self.database = self.database[self.database['DOIs'] != 'Unknown']
    #     pd.to_pickle(self.database, 'vector_database_80000_cleaned.pickle')

    #     issues = self.database[self.database['DOIs'] == 'Unknown']
    #     return issues
    
    def return_vector(self, doi: str):
        try:
            vec = self.database.at[doi, 'Vectors']
            return vec
        except:
            print("keyError: not found")
            return None
    
    def return_all_vectors(self):
        vectors_column = self.database['Vectors'].tolist()
        return vectors_column

    def return_all_doi_labels(self):
        doi_column = self.database.index.values.tolist()
        return doi_column
    
    def find_doi_info(self, dois: list):
        json_array = []
        for doi in dois:
            response = requests.get('https://api.crossref.org/works/$'+ doi)
            if response.status_code == 200:
                json_response = response.json()
                author_list = []
                title = ''
                date = ''
                id = ''
                if 'author' in json_response['message']:
                    authors = json_response['message']['author']
                    for author in authors:
                        try:
                            author_list.append(author['given']+' '+ author['family'])
                        except: 
                            pass
                else:
                    authors = ['No authors found']                  
                try:
                    title = json_response['message']['title'][0]
                except:
                    title = 'No title found'
                try: 
                    date = json_response['message']['published']['date-parts'][0]
                except:
                    date = 'Date not found'
                try:
                    id = json_response['message']['DOI']
                except: 
                    id = 'No DOI found'

                output = {
                    'title': title,
                    'author':author_list,
                    'date': date,
                    'doi': id
                }
                json_array.append(output)
        return json_array
        

if __name__ == '__main__':
    lookup = VectorLookup()
    lookup.change_database('backend/data/vector_database_800000_cleaned.pickle')
    print(lookup.return_vector('10.1038/modpathol.3800247'))
    print(lookup.return_all_vectors()[:5])
    dois = ["10.14309/ajg.0000000000002146", "10.2217/nnm-2023-0127", "10.3760/cma.j.issn.0253-2727.2022.12.004", "10.1016/S0140-6736(23)02048-2", "10.1097/PCC.0000000000003187", "10.1007/s40596-022-01721-1", "10.1016/j.xfss.2023.04.001", "10.1001/jama.2022.24989", "10.1111/cyt.13232", "10.1038/s41415-023-6437-x", "10.1016/j.annemergmed.2023.03.009", "10.1111/acem.14718", "10.1002/ajh.26660", "10.3390/microorganisms11040887", "10.2337/cd23-as01", "10.3390/jof8121314", "10.1101/2023.01.19.524758", "10.1097/01.tp.0000993128.89569.17", "10.1021/acsomega.8b03075", "10.1002/hep.31334", "10.1111/dmcn.15610", "10.1097/MPG.0000000000003940", "10.1136/bmj.p464", "10.1002/anie.202300957", "10.1016/j.jacig.2021.12.003", "10.3390/cimb44120420", "10.1111/jgs.18518", "10.1038/s41423-023-01021-0", "10.1101/2023.01.11.523704", "10.1007/s15006-023-2568-x", "10.3390/antiox12040808", "10.1097/CNJ.0000000000000849", "10.1016/j.ajogmf.2023.101191", "10.3785/j.issn.1008-9292.2016.09.06", "10.1016/j.medcli.2023.04.037", "10.1093/rheumatology/keac571", "10.1111/dmcn.15569", "10.1097/MAT.0000000000001774", "10.3390/nano13040731", "10.3390/plants12183341"]
    print(lookup.find_doi_info(dois))

    
