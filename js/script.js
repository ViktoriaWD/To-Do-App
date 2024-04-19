"use strict"
document.addEventListener('DOMContentLoaded', (event) => {
const toggleButton = document.getElementsByClassName('toggleButton');
const checkContainer = document.getElementsByClassName('checkContainer');
const hide = document.getElementsByClassName('hide');
const taskText = document.getElementsByClassName('taskP');
const darkModeToggle = document.getElementById('darkModeToggle');
const bodyMain = document.getElementById('main');
const inputStyle = document.getElementById('inputStyle');
const bgTasksCounter = document.getElementById('bg-tasks-counter');
const bgList = document.getElementById('bg-list');
const bgFooter = document.getElementById('bg-footer');
const allBtn = document.getElementById('all-btn');
const activeBtn = document.getElementById('active-btn');
const completedBtn = document.getElementById('completed-btn');
const toggleButtonId = document.getElementById('toggleButton');
const hideId = document.getElementById('hide');
const taskTextId = document.getElementById('task-paragraph');


inputStyle.addEventListener('keypress', function(e) {
  
  if (e.key === 'Enter' && this.value.trim() !== '') {
   
    e.preventDefault();

   
    var taskHTML = `
  <div class="task mx-auto md:w-2/5  flex items-center py-4 border-b border-gray-300 bg-white rounded-t-lg text-xs font-100 font-body pt-[17px] pb-[17px] pl-5 pr-3 tracking-normal">
    <button class="toggleButton cursor-pointer circle mr-3 relative w-5 h-5 border border-gray-200 rounded-full">
      <div class='hide hidden'>
        <div class="checkContainer absolute flex justify-center align-middle items-center w-5 h-5 rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-checkBackgroundLinearGgradient1 to-checkBackgroundLinearGgradient2">
          <img src="images/icon-check.svg" alt="Check Icon" class="w-[10px] h-[10px]">
        </div>
      </div>
    </button>
    <p class="taskP flex-1 text-[12px] font-body tracking-wider text-darkGrayishBlue bottom-3 ml-1">${this.value}</p>
    <button class='crossButton ml-auto focus:outline-none'>
      <img src="images/icon-cross.svg" alt="Cross Icon" class="w-[13px] h-[13px]">
    </button>
  </div>
`;

  
    document.querySelector('.tasks').insertAdjacentHTML('beforeend', taskHTML);

    // Clear the input field
    this.value = '';
  }
});

darkModeToggle.addEventListener('click', function() {
  document.documentElement.classList.toggle('dark');
  inputStyle.classList.toggle('bg-veryDarkDesaturatedBlue');
  console.log('Dark mode toggle clicked');
  bodyMain.classList.add('bg-veryDarkBlue');
  inputStyle.classList.toggle('bg-veryDarkDesaturatedBlue'); 
  bgList.classList.toggle('bg-veryDarkDesaturatedBlue');
  bgTasksCounter.classList.toggle('bg-veryDarkDesaturatedBlue');
  bgFooter.classList.toggle('bg-veryDarkDesaturatedBlue');
});


   

    toggleButtonId.addEventListener('click', function() {
      hideId.classList.toggle('hidden');
      taskTextId.classList.add('text-lightGrayishBlue');
      taskTextId.style.textDecoration = 'line-through';
    });
   

});