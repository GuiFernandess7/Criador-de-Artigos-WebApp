import React from 'react'
import { useState, useEffect } from 'react';
import APIService from './APIService';

function Form(props) {
    const[title, setTitle] = useState(props.article.title)
    const[body, setBody] = useState(props.article.body)

    useEffect(() => {
        setTitle(props.article.title)
        setBody(props.article.body)
    }, [props.article])


    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, body})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    }

    const insertArticle = () => {
        APIService.InsertArticle({title, body})
        .then(resp => props.insertedArticle(resp))
        .catch(error => console.log(error))
    }

  return (
    <React.Fragment>
        <div>

            {props.article ? (
            
            <div className = 'mb-3'>
                <label htmlFor="title" className='form-label'>
                    title
                </label>

                <input type="text" className="form-control"
                placeholder="Please Enter Title" value={title}
                onChange= {(e) => setTitle(e.target.value)}
                />

                <label htmlFor="body" className='form-label'>
                    Description
                </label>

                <textarea className="form-control" 
                placeholder="Please enter description" 
                name="" 
                id="" 
                cols="30" 
                value={body}
                onChange= {(e) => setBody(e.target.value)}
                rows="10"></textarea>

                {
                    props.article.id ?
                    <button className='btn btn-success mt-3' 
                    onClick={updateArticle}
                    >Update</button>
                    :
                    <button className='btn btn-success mt-3' 
                    onClick={insertArticle}
                    >Insert</button>
                    
                } 

                
            </div>

            ) : null}

        </div>
    </React.Fragment>
  )
}

export default Form;