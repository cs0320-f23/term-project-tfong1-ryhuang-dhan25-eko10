import unittest
import requests
import random

class VectorSearchTestCase(unittest.TestCase):
    def test_cosine_similarity_endpoint(self):
        url = 'http://127.0.0.1:5000/knn'
        params = {'query': '0.1038/s41551-023-01045-x', 'k': 20}

        response = requests.get(url, params=params)
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['type'], 'success')
        self.assertIn('result', data)
        
    def test_cosine_similarity_valid_points(self):
        url = 'http://127.0.0.1:5000/knn'
        params = {'query': '0.1038/s41551-023-01045-x', 'k': 20}

        response = requests.get(url, params=params)
        data = response.json()
        self.assertEqual(len(data['result']), 20-2)
        self.assertEqual(len(data['result'][0]), 5)
        self.assertEqual(len(data['result'][0]['doi']), 36)
        self.assertEqual(len(data['result'][0]['title']), 1)
        self.assertEqual(len(data['result'][0]['authors']), 1)
        self.assertEqual(len(data['result'][0]['date']), 4)
        self.assertEqual(len(data['result'][0]['abstract']), 1)

    def test_cosine_similarity_fuzz_k(self):
        url = 'http://127.0.0.1:5000/knn'
        for i in range(50):
            k = random.randint(0, 50)
            params = {'query': '0.1038/s41551-023-01045-x', 'k': k}

            response = requests.get(url, params=params)
            data = response.json()
            self.assertEqual(len(data['result']), k-1)
            self.assertEqual(len(data['result'][0]), 5)

    # Add more test cases as needed

if __name__ == '__main__':
    unittest.main()