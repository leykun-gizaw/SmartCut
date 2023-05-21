#!/usr/bin/python3
from variables import x, y, solver, data

for i in data['cuts']:
    solver.Add(sum(x[i, j] for j in data['std_pcs']) == 1)

for j in data['std_pcs']:
    solver.Add(
        sum(x[(i, j)] * data['lengths'][i] for i in data['cuts']) <= y[j] *
        data['std_len']
    )
