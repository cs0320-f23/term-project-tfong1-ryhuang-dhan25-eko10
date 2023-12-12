import numpy as np
from numpy.linalg import norm
import heapq

class Node:
    def __init__(self, point, left, right):
        self.point = point
        self.left = left
        self.right = right
        self.bounding_box = None
    
class KD_Tree:
    def __init__(self, points, dimension):
        self.points = points
        self.dimension = dimension
        self.max_values = []
        for dim in range(self.dimension):
            points.sort(key=lambda x: x[dim])
            self.max_values.append((points[0][dim], points[-1][dim]))
        self.tree = self.make_tree(points, 0, None)
    
    def make_tree(self, points, curr_dim, prev_box):
        if len(points) == 0:
            return None
        points.sort(key=lambda x: x[curr_dim])
        mid = len(points)//2
        next_dim = (curr_dim + 1) % self.dimension
        new_node = Node(points[mid], None, None)
        if prev_box is None:
            new_node.bounding_box = self.max_values
        else:
            new_pt = (min(prev_box[curr_dim][0], points[mid][curr_dim]), max(prev_box[curr_dim][1], points[mid][curr_dim]))
            new_node.bounding_box = prev_box[:curr_dim] + [new_pt] + prev_box[curr_dim+1:]
        new_node.left = self.make_tree(points[:mid], next_dim, new_node.bounding_box)
        new_node.right = self.make_tree(points[mid+1:], next_dim, new_node.bounding_box)
        return new_node

    def cosine_similarity(self, point1, point2):
        pt1 = np.array(point1)
        pt2 = np.array(point2)
        norm_pt1 = norm(pt1)
        norm_pt2 = norm(pt2)

        if norm_pt1 == 0 or norm_pt2 == 0:
            return 0  # Handle the case where the denominator is zero

        cos_similarity = np.dot(pt1, pt2) / (norm_pt1 * norm_pt2)
        return cos_similarity
    
    def is_point_inside_bbox(self,bbox, point):
        return all(bbox[i][0] <= point[i] <= bbox[i][1] for i in range(len(bbox)))
    
    def distance_to_bbox(self, bbox, point):
        if self.is_point_inside_bbox(bbox, point):
            return 0  # Point is inside the bounding box

        # Calculate the distance to the nearest edge of the bounding box
        distances = [max(0, bbox[i][0] - point[i], point[i] - bbox[i][1]) for i in range(len(bbox))]
        return min(distances) # approximation
    
    def kNN_helper(self, query_pt, node : Node, heap, curr_dim, k):
        if node is None:
            return None
        if len(heap) >= k and self.distance_to_bbox(node.bounding_box, query_pt) > heap[0][0]:
            return None
        similarity = self.cosine_similarity(query_pt, node.point)
        dim_diff = node.point[curr_dim] - query_pt[curr_dim]
        if len(heap) < k:
            heapq.heappush(heap, (similarity, node.point))
        elif similarity < heap[0][0]:
            heapq.heappop(heap)
            heapq.heappush(heap, (similarity, node.point))
        curr_dim = (curr_dim + 1) % self.dimension

        if dim_diff > 0: # case when current node's value at that dimension is greater
            self.kNN_helper(query_pt, node.left, heap, curr_dim, k)
            self.kNN_helper(query_pt, node.right, heap, curr_dim, k)
        else:
            self.kNN_helper(query_pt, node.right, heap, curr_dim, k)
            self.kNN_helper(query_pt, node.left, heap, curr_dim, k)
    
    def kNN(self, query_pt, k):
        min_heap = []
        self.kNN_helper(query_pt, self.tree, min_heap, 0, k)
        return [point for _, point in min_heap]

    
if __name__ == "__main__":
    points = [(0,1,1), (1,2,1), (9,8,9)]
    kd_tree = KD_Tree(points, 2)
    print(kd_tree.kNN((0,1,9), 2))
    


