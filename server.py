import os
import json

import numpy as np
import pandas as pd

from typing import List
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

full_path = 'C:\\Users\\devas\\.cache\\kagglehub\\datasets\\arashnic\\book-recommendation-dataset\\versions\\3'
books_df = pd.read_csv(
    os.path.join(full_path, "Books.csv"),
    delimiter=',',
    low_memory=False,
)#[:100]

min_r = 8
max_rec = 10
ISBN_list = books_df['ISBN'].unique()
book_list = books_df[books_df['ISBN'].isin(ISBN_list)].copy()[['ISBN', 'Book-Title', 'Year-Of-Publication']]
book_list = book_list[:int(book_list.shape[0]*0.4)].copy()

cosine_sim = np.load('cosine_sim.npy')
cosine_sim = cosine_sim[:book_list.shape[0], :book_list.shape[0]]

def rec_func(isbn_user, cosine_sim=cosine_sim, max_rec=max_rec):
    isbn = book_list[book_list['ISBN'] == isbn_user].index[0]
    sim_score = list(enumerate(cosine_sim[isbn]))
    sim_score = sorted(sim_score, key=lambda x: x[1], reverse=True)[1:max_rec+1]
    idxs = [i[0] for i in sim_score]

    return book_list.iloc[idxs]

class ISBNRequest(BaseModel):
    isbn: str

@app.post('/get_recs')
def get_recs(req: ISBNRequest):
    try:
        recs = rec_func(req.isbn)
        return recs.to_dict(orient='records')
    except KeyError:
        raise HTTPException(status_code=404, detail="ISBN not found")
    
@app.get('/get_books')
def get_books():
    return books_df.head(20).to_dict(orient='records')

# uvicorn server:app --reload