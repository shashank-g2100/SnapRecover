import numpy as np


def sanitize_for_mongo(obj):

    if isinstance(
        obj,
        np.generic
    ):
        return obj.item()

    if isinstance(obj, dict):
        return {
            k: sanitize_for_mongo(v)
            for k, v in obj.items()
        }

    if isinstance(obj, list):
        return [
            sanitize_for_mongo(v)
            for v in obj
        ]

    return obj