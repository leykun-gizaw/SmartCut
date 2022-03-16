#!/usr/bin/python3

def solve_ip(data, solver, x, y, pywraplp):
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
