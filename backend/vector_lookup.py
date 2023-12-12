import pandas as pd

class VectorLookup:
    def __init__(self) -> None:
        self.database: pd.DataFrame = None
        self.query = None
    
    def change_database(self, filename: str):
        try:
            self.database = pd.read_pickle(filename)
            self.database = self.database.set_index('DOIs')
            print('success!')
            return self.database
        except:
            print("failed to find database")
            return None
        
    def return_vector(self, doi):
        try:
            vec = self.database.at[doi, 'Vectors']
            # vec_list = vec.strip('[]').split()
            # x = [float(i) for i in vec_list]
            # return x
            return vec
        except:
            print("keyError: not found")
            return None
    
    def return_all_vectors(self):
        return self.database['Vectors']

if __name__ == '__main__':
    lookup = VectorLookup()
    lookup.change_database('backend/data/vector_database_80000.pickle')
    print(lookup.return_vector('10.1038/modpathol.3800247'))
    print(lookup.return_all_vectors()[:5])

