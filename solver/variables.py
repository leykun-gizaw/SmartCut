#!/usr/bin/python3
from ortools.linear_solver import pywraplp

solver = pywraplp.Solver.CreateSolver('SCIP')

def define_variables(data):
    x = {}
    for i in data['cuts']:
        for j in data['std_pcs']:
            x[(i, j)] = solver.IntVar(0, 1, 'x_{}_{}'.format(i, j))
    y = {}
    for j in data['std_pcs']:
        y[j] = solver.IntVar(0, 1, 'y[{}]'.format(j))
    return (x, y)
