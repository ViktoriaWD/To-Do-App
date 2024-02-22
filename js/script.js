"use strict"
const toggleButton = document.getElementById('toggleButton');
const checkContainer = document.getElementById('checkContainer');
const hide = document.getElementById('hide');
const taskText = document.getElementById('task-paragraph');
const darkModeToggle = document.getElementById('darkModeToggle');
const bodyMain = document.getElementById('main');
const inputStyle = document.getElementById('inputStyle');
const bgTasksCounter = document.getElementById('bg-tasks-counter');
const bgList = document.getElementById('bg-list');
const bgFooter = document.getElementById('bg-footer');
const allBtn = document.getElementById('all-btn');
const activeBtn = document.getElementById('active-btn');
const completedBtn = document.getElementById('completed-btn');



darkModeToggle.addEventListener('click', function() {
    console.log('Dark mode toggle clicked');
   bodyMain.classList.add('bg-veryDarkBlue');
   inputStyle.classList.add('bg-veryDarkDesaturatedBlue');
   bgList.classList.add('bg-veryDarkDesaturatedBlue');
   bgTasksCounter.classList.add('bg-veryDarkDesaturatedBlue');
  bgFooter.classList.add('bg-veryDarkDesaturatedBlue');
  });

  toggleButton.addEventListener('click', function() {
 
  hide.classList.toggle('hidden');
  taskText.classList.add('text-lightGrayishBlue');
  taskText.style.textDecoration = 'line-through';


});