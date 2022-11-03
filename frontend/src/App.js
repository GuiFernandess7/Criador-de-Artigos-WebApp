import './App.css';
import {useEffect, useState} from 'react';
import ArticleList from './components/article-list'; 
import Form from './components/Form';

function App() {

  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticle] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'methods':'GET',
      headers: {
        'Content-Type':'application/json'
       }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  
  }, [])

  const editArticle = (article) => {
    setEditedArticle(article)
  }

  const updatedData = (article) => {
    const new_article = articles.map(my_article =>{
      if (my_article.id === article.id){
        return article
      } else {
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm = () => {
    setEditedArticle({title: '', body: ''})
  }

  const insertedArticle = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteArticle = (article) => {
    const new_articles = articles.filter(my_article => {
      if(my_article.id === article.id) {
        return false
      }
      return true
    })
    setArticles(new_articles)
  }

  return (
    <div className="App">
      <div className='row'>

        <div className='col'>
        <h1>Crie seu Artigo!</h1>
        </div>

      </div> 

      <div className='col'>
        <button
        className='btn btn-success'
        onClick = {openForm}>
          Adicionar Artigo
        </button>
      </div>

          

      <hr></hr>
      
      <ArticleList articles = {articles} editArticle = {editArticle} deleteArticle = {deleteArticle}/>
      {editedArticle ? <Form article= {editedArticle} updatedData = {updatedData} 
      insertedArticle= {insertedArticle} /> : null}
    </div>
  );
}

export default App;
