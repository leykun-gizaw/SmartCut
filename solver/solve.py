#!/usr/bin/python3
"""Module defines `solve_ip` (solve integer programming) function."""

def solve_ip(data, solver, x, y, pywraplp):
    """Call Solve() method of SCIP solver and return custom result.

    Returns customized result dictionary; `optimized_data`, to whoever calls
    it. It requires 4 arguments to function properly.

    Args:
        data: Constructed data-model dictionary from Steel class's object.
        solver: Solver object from Google's ORTools python wrapper `pywraplp`.
        x: Dictionary representing Coefficient matrix of constraints.
        y: Dictionary representing decision variable of stock usage.

    Returns:
        Dictionary with `cuts`, `tot_cut_len`, and `waste` Attributes set to
        correct values upon successful optimization. Empty Dictionary if
        optimization failed.
    """
    status = solver.Solve()
    optimized_data = {}
    if status == pywraplp.Solver.OPTIMAL:
        for j in data['std_pcs']:
            if y[j].solution_value() == 1:
                cuts = []
                cuts_len = 0
                for i in data['cuts']:
                    if x[i, j].solution_value() > 0:
                        cuts.append(data['Lengths'][i])
                        cuts_len += data['Lengths'][i]
                if cuts_len > 0:
                    optimized_data['{}'.format(j + 1)] = {
                        'cuts': cuts,
                        'tot_cut_len': cuts_len,
                        'waste': data['std_len'] - cuts_len
                    }
        print('Time = ', solver.WallTime(), ' milliseconds')
    else:
        print('The problem does not have an optimal solution.')
    return optimized_data
