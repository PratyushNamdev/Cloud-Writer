import React ,{useState , useContext} from 'react'
import './Style/addnote.css'
import NoteContext from './context/Notes-Context/NoteContext'



export default function AddNote() {
 const [userNote , setUserNote] = useState({title:"" , tag:"" , description:""})
 const {addNote} = useContext(NoteContext);
 const handleChange = (e)=>{
    setUserNote({...userNote , [e.target.name] : e.target.value})
    
 }
const handleSubmit = ()=>{
  addNote(userNote.title , userNote.tag , userNote.description);
}
  return (
    <div className='addnote_container'>
      <h1>Add a Note</h1>
      <form >
          <div className="title_tag_container">
            <div className='title_div addnote_child'>
              <h3>Title</h3>
             <input type="text" className='input' name='title' onChange={handleChange} />
            </div>
            <div  className='tag_div addnote_child'>
              <h3>Tag</h3>
              <input type='text' className='input' name='tag' onChange={handleChange} />
            </div>
          </div>
          <div className='description_div addnote_child'>
            <h3>Description</h3>
           <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} ></textarea>
          </div>
      </form>
      <button className='submit_btn' onClick={handleSubmit}>SUBMIT</button>
    </div>
  )
}
