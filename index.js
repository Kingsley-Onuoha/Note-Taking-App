
 let createNoteButton = document.getElementById(`create-note-button`)
 let closeIcon = document.getElementById(`close-icon`)
 let submitNoteButton = document.getElementById(`submitButton`)
 let modalComponent = document.getElementById(`modal-component`)
 let noteForm = document.getElementById(`note-form`)
 let titleInput = document.getElementById(`titleOfNote`)
 let noteInput = document.getElementById(`takeNote`)
 let rightBox = document.getElementById(`right-box`)
 let inputTag = document.getElementById(`titleOfNote`)
 let textAreaTag = document.getElementById(`takeNote`)
 let pTag = document.getElementById(`pTag`)
 let checker = true

 let months = ["January","February","March","April","May","June","July",
 "August","September","October","November","December"]

 let dateObj = new Date() 
 let month = months[dateObj.getMonth()]
 let day = dateObj.getDate()
 let year = dateObj.getFullYear();

 let createdNoteArray = []

function createNote(){
  modalComponent.classList.remove(`modal-component`)
  modalComponent.classList.add(`modal-component-visibility`)
  submitNoteButton.innerText = `Create Note`
  pTag.innerText =`Note`
  inputTag.value = ``
  textAreaTag.value = ``
}
createNoteButton.addEventListener(`click`, createNote)


function closeNoteForm (){
 if(modalComponent.classList.contains(`modal-component-visibility`)){
  modalComponent.classList.remove(`modal-component-visibility`)
  modalComponent.classList.add(`modal-component`)
}
}
closeIcon.addEventListener(`click`, closeNoteForm)


function printCreatedNoteArrayOnUI (){

  rightBox.innerHTML =""

  createdNoteArray.forEach(function (allCreatedNotesFromArray, index){

  let printNoteTitle = allCreatedNotesFromArray.titleOfNote;
  let printNoteProper = allCreatedNotesFromArray.noteProper;
  let printedNoteDate = allCreatedNotesFromArray.noteDate;
  console.log(printNoteProper)
  
  let noteBoxDiv = document.createElement(`div`)
  noteBoxDiv.classList.add(`note-box`)

  let noteTitleDiv = document.createElement(`div`)
  noteTitleDiv.classList.add(`note-title`)
  
  let titleText = document.createElement(`h`)
  titleText.classList.add(`title`)
  titleText.textContent = printNoteTitle

  let noteDescriptionDiv = document.createElement(`div`)
  noteDescriptionDiv.classList.add(`note-description`)

  let noteDescriptionParagraphDiv = document.createElement(`p`)
  noteDescriptionParagraphDiv.classList.add(`note-description-paragraph`)
  noteDescriptionParagraphDiv.textContent = printNoteProper

  let dateTimeIconDiv = document.createElement(`div`)
  dateTimeIconDiv.classList.add(`date-time-icon`)

  let dateTime = document.createElement(`div`)
  dateTime.classList.add(`date-time`)

  let date = document.createElement(`p`)
  date.classList.add(`date`)
  date.textContent = printedNoteDate

  let modalIconDiv = document.createElement(`div`)
  modalComponent.classList.add(`modal-icon`)

  let icon = document.createElement(`i`)
  icon.classList.add(`fa`, `fa-ellipsis`)
  icon.setAttribute(`id`,`modalToggle`)

  // let modalProperties = document.createElement(`div`)
  // modalProperties.classList.add(`modal-properties`)
  // modalProperties.setAttribute(`id`, `modal-properties`)

  let unorderedList = document.createElement(`ul`)
  unorderedList.classList.add(`ul`)

  let editListItem = document.createElement(`li`)
  editListItem.classList.add(`edit`)
  editListItem.textContent = `Edit`
  editListItem.setAttribute("onclick",`editNote(${index},'${printNoteTitle}',"${printNoteProper}")`)

  let deleteListItem = document.createElement(`li`)
  deleteListItem.classList.add(`delete`)
  deleteListItem.setAttribute(`onclick`,`deleteNote('${index}')`)
  deleteListItem.textContent = `Delete`

  unorderedList.append(editListItem, deleteListItem)

  // modalProperties.append(unorderedList)

  modalIconDiv.append(unorderedList)

  dateTime.append(date)

  dateTimeIconDiv.append(dateTime, modalIconDiv )

  noteDescriptionDiv.append(noteDescriptionParagraphDiv)

  noteTitleDiv.append( titleText)

  noteBoxDiv.append(noteTitleDiv, noteDescriptionDiv, dateTimeIconDiv )

  rightBox.append(noteBoxDiv)

  function modalToggle (){
    if(checker){
      modalProperties.classList.remove(`modal-properties`)
      modalProperties.classList.add(`modal-properties-visibility`)
      checker = false
    }else if(!checker){
      modalProperties.classList.remove(`modal-properties-visibility`)
      modalProperties.classList.add(`modal-properties`)
      noteDescriptionParagraphDiv.contentEditable = false
      checker = true
    }
  }
  icon.addEventListener(`click`, modalToggle)

})
}

function editNote(id, title, noteProper){

    createNoteButton.click()
    submitNoteButton.innerText = `Update Note`
    pTag.innerText =`Update Your Note`
    inputTag.value = title
    textAreaTag.value = noteProper
    inputTag.focus()
    createdNoteArray.splice(id, 1)
  
  console.log(id, title, noteProper)
}


function deleteNote(id){
    
    createdNoteArray.splice(id, 1)
    
    localStorage.setItem(`notes`,JSON.stringify(createdNoteArray))

    fetchCreatedNoteArray()
}

function fetchCreatedNoteArray(){
  if(localStorage.getItem(`notes`)){
    createdNoteArray = JSON.parse(localStorage.getItem(`notes`))
  }
  printCreatedNoteArrayOnUI ()
}
fetchCreatedNoteArray()

function submitNote(event){
  event.preventDefault()
  location.reload()

  let noteTitle = titleInput.value
  let noteTaken = noteInput.value
  let noteDate = `${month} ${day}, ${year}`

  const createdNoteObject = {
    titleOfNote : noteTitle,
    noteProper : noteTaken,
    noteDate : noteDate
  }

  createdNoteArray.push(createdNoteObject)
  localStorage.setItem(`notes`, JSON.stringify(createdNoteArray))


  fetchCreatedNoteArray()
  noteForm.reset()
  closeNoteForm ()
}
noteForm.addEventListener(`submit`, submitNote)


