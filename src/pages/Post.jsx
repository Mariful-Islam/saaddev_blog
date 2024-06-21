import React, { useState } from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'


const Post = () => {

  let navigate = useNavigate()
  let username = localStorage.getItem('username')

  let [content, setContent] = useState('')

  let [postRes, setPostRes] = useState('')

  let postHandle = async (e) => {
    e.preventDefault()
    localStorage.setItem('username', e.target.username.value);
    e.preventDefault()
    let response = await fetch('https://saaddev.pythonanywhere.com/blog/create_post/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'user': username ? username : e.target.username.value,
        'title': e.target.title.value,
        'content': content,
        'tag': e.target.tag.value
      })
    })
    let data = await response.json()
    setPostRes(data)

    navigate('/')

  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '2px solid #11e4c1' : '2px solid #ccc',
      boxShadow: state.isFocused ? '0 0 0 1px #11e4c1' : 'none',
      '&:hover': {
        border: '2px solid #11e4c1',
      },
    }),
    input: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      outline: 'none'
    }),
  };


  return (
    <div className='wrapper post'>
      {
        postRes ?
          <div className='response'>{postRes}</div>
          :
          <form method='POST' onSubmit={postHandle}>
            {username?.length === 0 ?
              <input className='form_input' type='text' name='username' placeholder='username' /> :
              <input className='form_input' type='text' name='username' value={username} placeholder='username' style={{ display: 'none' }} />
            } <br />
            <input className='form_input' type='text' name='title' placeholder='title' />
            <CKEditor editor={ClassicEditor}
              onChange={(event, editor) => setContent(editor.getData())}


            /> <br />
            <input className='form_input' type='text' name='tag' placeholder='Tag, write separated with comma' /><br />
            <Select
              isMulti
              value={selectedOptions}
              onChange={handleChange}
              options={options}
              styles={customStyles}

            />
            <button type='submit' className='fill_btn' style={{ height: 40, width: 130 }}>Post</button>
          </form>
      }
    </div>
  )
}

export default Post