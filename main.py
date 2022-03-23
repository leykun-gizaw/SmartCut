#!/usr/bin/python3
"""Entry module to the backend.

Defines and exposes functions to javascript by using `eel` library.
    Typical usage example:

    # Following should open a chromium window serving appropriate index.html
    $ python main.py
"""
import eel
from copy import deepcopy
from solver.steel_model import Steel
from solver.solve import solve_ip

eel.init("web")

@eel.expose
def capture_data(data):
    """Capture data from frontend and send back optimized data.

    Args:
        data: Dictionary converted from JSON containing all parsed CSV data.
            data = {
                'steel_name': {
                    'Lengths': [-,-,-],
                    'Quantity': [-,-,-],
                },
            }
    Returns:
        Optimized data from solve module's `solve_ip` function.
    """
    optimized = {}
    for k, v in revise_data(data).items():
        steel = Steel(k, v)
        steel.create_model()
        optimized[k] = solve_ip(
            steel.data,
            steel.solver,
            steel.x,
            steel.y,
            steel.wrapper
        )
    return optimized

def revise_data(data):
    """Refactor `data` and make it ready for data model construction

    Populate `lengths` with all lengths by allowing multiple insertion of
    identical lengths according to number of quantities for each length.

    Args:
        data: Dictionary with length & quantity lists of all steels.

    Returns:
        Optimized data from solve module's `solve_ip` function.
    """
    revised_data = {}
    for k, v in data.items():
        lengths = []
        for i in range(len(v['Quantity'])):
            for _ in range(int(v['Quantity'][i])):
                lengths.append(float(v['Lengths'][i]))
        revised_data[k] = deepcopy(lengths)

    return revised_data

eel.start("index.html")
