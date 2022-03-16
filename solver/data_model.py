#!/usr/bin/python3
"""Create the appropriate data model for provided cut list"""

def create_data_model(lengths):
    """Create the data for the example."""
    data = {}
    data['lengths'] = lengths
    data['cuts'] = list(range(len(lengths)))
    data['std_pcs'] = data['cuts']
    data['std_len'] = 6000
    return data
