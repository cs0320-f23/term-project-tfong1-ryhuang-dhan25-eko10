import unittest
import requests

class VectorSearchTestCase(unittest.TestCase):
    def test_cosine_similarity_endpoint(self):
        url = 'http://127.0.0.1:5000/knn'
        params = {'query': 'western blot', 'k': 20}

        response = requests.get(url, params=params)
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['type'], 'success')
        self.assertIn('result', data)
        
    def test_cosine_similarity_valid_points(self):
        url = 'http://127.0.0.1:5000/knn'
        params = {'query': 'western blot', 'k': 20}

        response = requests.get(url, params=params)
        data = response.json()
        self.assertEqual(len(data['result']), 20)
        self.assertEqual(len(data['result'][0]), 4)
        self.assertEqual(len(data['result'][0]['doi']), 36)
        self.assertEqual(len(data['result'][0]['title']), 1)
        self.assertEqual(len(data['result'][0]['authors']), 1)
        self.assertEqual(len(data['result'][0]['date']), 4)
        self.assertEqual(len(data['result'][0]['abstract']), 1)


    # Add more test cases as needed

if __name__ == '__main__':
    unittest.main()