import string
from random import randint


def generate_random_code(num_of_symbols=30):
    s = string.digits + string.ascii_letters
    n = len(s) - 1
    return ''.join([s[randint(0, n)] for _ in range(num_of_symbols)])

