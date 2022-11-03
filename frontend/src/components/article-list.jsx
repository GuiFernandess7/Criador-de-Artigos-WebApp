import React from 'react'
import APIService from './APIService'

function ArticleList(props) {

    const editArticle = (article) => {
      props.editArticle(article)
    }

    const deleteArticle = (article) => {
      APIService.DeleteArticle(article.id)
      .then(() => props.deleteArticle(article))
    }

  return (
    <div>
        {props.articles && props.articles.map(article => {
        return (
            <React.Fragment>
            <div key = {article.id}>
             <h2>{article.title}</h2>
             <p>{article.body}</p>
             <p>{article.date}</p>

             <div className='row'>
                <div className='col-md-1'>
                    <button className='btn btn-primary m-2'
                    onClick = {() => editArticle(article)}>Update</button>
                </div>

                <div className='col'>
                    <button className='btn btn-danger m-2'
                    onClick = {() => deleteArticle(article)}>Delete</button>
                </div>
             </div>   
          </div>

          <hr />
          </React.Fragment>
        )
      })}

    </div>
  )
}

export default ArticleList;