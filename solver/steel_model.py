#!/usr/bin/python3
"""Module defines a class `Steel` to construct data-model of its object.
    Typical usage example:

    import steel_model

    # Just creating the object.
    angle_iron = steel_model.Steel('ANGLE_IRON', [23, 32, 34, 43])

    # Creating all attributes required by the solve module
    angle_iron.create_model()
"""
from ortools.linear_solver import pywraplp


class Steel:
    """
    Construct steel object with methods

    Class requires two mandatory arguments when initializing object; name of
    steel (of type string) and Lengths list (of type list) containing all required
    lengths to be cut. Its methods are responsible to create the required
    data-model of created object ready to be sent to `solve` module.

    Attributes:
        name: String representing real life name of object.
        Lengths: List containing all required cut lengths.
        solver: Solver object from Google's ORTools python wrapper `pywraplp`.
        wrapper: Wrapper for python of an ORTools solver
        data: Dict created by `data_model` method using Lengths attribute.
        x: Dict created by `variables` method (details in method definition).
        y: Dict created by `variables` method (details in method definition).
    """
    def __init__(self, steel_name, Lengths):
        """
        Initialize steel object with name and lengths list
        """
        self.name = steel_name
        self.Lengths = Lengths

        # Assign solver attribute to object for `solve` module's convenience
        self.solver = pywraplp.Solver.CreateSolver('SCIP')

        # Assign wrapper attribute for the same reason mentioned above
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
        self.data['std_len'] = 6000  # 6000 in millimeters
        return None

    def variables(self):
        """Create appropriate variables based on data model.

        x: Matrix created from the constraint coefficients.
        x = {(0, 0): 'x_0_0', (0, 1): 'x_0_1', ...}
        y = {0: 'y[0]', 1: 'y[1]', ...}

        more info on variable definition for solver:
            https://developers.google.com/optimization/bin/bin_packing
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
        """Create constraints based on variables.

        more info on variable constraints definition for solver:
            https://developers.google.com/optimization/bin/bin_packing
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
        Call all methods to make object ready for computation
        """
        self.constraints()
        return None
    pass
