#!/usr/bin/python3
"""Module defines steel class"""
from ortools.linear_solver import pywraplp


class Steel:
    """
    Class to construct steel object with methods
    """
    def __init__(self, steel_name, Lengths):
        """
        Initialize steel object with name and lengths list
        """
        self.name = steel_name
        self.Lengths = Lengths
        self.solver = pywraplp.Solver.CreateSolver('SCIP')
        self.wrapper = pywraplp
        return None

    def data_model(self):
        """
        Create appropriate data model of steel lengths
        """
        self.data = {}
        self.data['Lengths'] = self.Lengths
        self.data['cuts'] = list(range(len(self.Lengths)))
        self.data['std_pcs'] = self.data['cuts']
        self.data['std_len'] = 6000
        return None

    def variables(self):
        """
        Create appropriate variables based on data model
        """
        self.x, self.y = {}, {}
        self.data_model()

        for i in self.data['cuts']:
            for j in self.data['std_pcs']:
                self.x[i, j] = self.solver.IntVar(
                    0,
                    1,
                    'x_{}_{}'.format(i, j)
                )
        for j in self.data['std_pcs']:
            self.y[j] = self.solver.IntVar(
                0,
                1,
                'y[{}]'.format(j)
            )
        return None

    def constraints(self):
        """
        Create constraints based on variables
        """
        self.variables()
        for i in self.data['cuts']:
            self.solver.Add(
                sum(self.x[(i, j)] for j in self.data['std_pcs']) == 1
            )
        for j in self.data['std_pcs']:
            self.solver.Add(
                sum(self.x[(i, j)] * self.data['Lengths'][i] for i in
                    self.data['cuts']) <= self.y[j] *
                self.data['std_len']
            )
        return None

    def create_model(self):
        """
        Initialize all methods to make object ready for computation
        """
        self.constraints()
        return None
    pass
