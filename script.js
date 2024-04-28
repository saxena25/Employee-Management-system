// console.log('Hello');
let tbody = document.querySelector('tbody');
let userDepartment = document.querySelector('#department');
let userGender = document.querySelector('#gender')
let userSalary = document.querySelector('#salary');
let backBtn = document.querySelector('.prevBtn');
let nextBtn = document.querySelector('.nextBtn');

let pageNo = 1;
let limit = 10;

async function fetchData(sortSalary = '', sortDepartment = ''){
    let API_URL = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10';

    if(sortDepartment != ''){
        API_URL += `&filterBy=department&filterValue=${sortDepartment}`
    }
    if(sortSalary != ''){
        API_URL += '&sort=salary&order='+sortSalary;
    }


    try {
        let res = await fetch(API_URL);
        let finalRes = await res.json();
        let data = finalRes.data;
        // console.log(data);
        // return data;
        displayData(data);
    } catch (error) {
        console.log('error in fetch');
    }
}



function displayData(data){
    tbody.innerHTML = '';
    data.forEach((e)=>{
        let tr = document.createElement('tr');
        
        let sno = document.createElement('td');
        sno.innerText = e.id;

        let name = document.createElement('td');
        name.innerText = e.name;

        let gender = document.createElement('td');
        gender.innerText = e.gender;

        let department = document.createElement('td');
        department.innerText = e.department;

        let salary = document.createElement('td');
        salary.innerText = e.salary;
        
        tr.append(sno, name, gender, department, salary);
        tbody.append(tr);
    })
}



backBtn.addEventListener('click',()=>{
    if(pageNo > 1){
       pageNo - 1;
       fetchData();
    }
})
nextBtn.addEventListener('click',()=>{
    pageNo + 1;
    fetchData();
})


userSalary.addEventListener('change',()=>{
    fetchData(userSalary.value);
})

userDepartment.addEventListener('change',()=>{
    fetchData('',userDepartment.value)
})


fetchData()

