//1. Реализуйте функцию, которая принимает параметром подсторку, число повторов и разделитель, а возвращает сторку, состоящую из указанного количества повторов подстроки с использованием разделителя.
// repeatString("yo", 3, " ") => "yo yo yo"
// repeatString("yo", 3, ",") => "yo,yo,yo"
// for или str.repeat()


const stfn = (str: any, count: any) => {
    console.log(str.repeat(count).slice(0,-1))

    let summ = ''
    for (let i = 0; i <= count-1; i++) {
        summ += 'anton '
    }
    console.log(summ.slice(0,-1))
}
stfn('anton ', 3)

//2. Реализуйте функцию, которая принимает параметром сторку и подстроку, а возвращает true, если строка начинается с указанной подстроки, в противном случае - false. Регистр не учитывается.


const stfn=(str, substr)=>{
    console.log(str.slice(1))
    console.log(str.startWith(substr))
    console.log(str.charAt(0)===substr.charAt(0))
}
stfn('anton', 'alena')


//3. Реализуйте функцию, которая принимает параметром строку и число (количество символов), а возвращает строку из параметров, обрезанную до указанного количества символов и завершает её многоточием.
//truncateString("Всем студентам инкубатора желаю удачи!", 10) => "Всем студе..."


const stfn = (str: any, count: any) => {
    console.log(str.slice(0,count)+'...')
}
stfn('anton ', 4)


//4. Реализуйте функцию, которая принимает параметром сторку (предложение) и возвращает самое короткое слово в предложении, если в параметрах пустая строка, то возвращает null.
// getMinLengthWord("Всем студентам инкубатора желаю удачи!") => "Всем"
// getMinLengthWord("") => null
// split()
const stfn = (str:any, count:any) => {
    console.log(str.split(" ").reduce((acum:any, item:any) =>
        item.length < acum.length ? item : acum))
};

stfn('I am full love', 4);


//5. Реализуйте функцию, которая принимает параметром сторку (предложение) и возвращает то же предложение, где все слова написаны строчными, но начинаются с заглавных букв.
// setUpperCase("всем стУдентам инкуБатора Желаю удачИ!") => "Всем Студентам Инкубатора Желаю Удачи!"

// !!!!!!!!!!!!!!!!!!После решения 5 задач - поднимаем руку!!!!!!!!
const stfn = (str:any, count:any) => {
    console.log(str.split(" ").map((item:any) => item.toLowerCase().slice(0,1).toUpperCase()+item.toLowerCase().slice(1))
    )};

stfn('I am full love', 4);



//6. Реализуйте функцию, котрая принимает параметрами строку и подстроку. Если все
// символы подстроки содержаться в стороке - возвращает true, если нет -
// возвращает false. Проверка проводится без учёта регистра и без учётом
// повторяющихся символов.
//* попробовать учитывать повтор символов в подстроке

const stfn=(str:any, substr:any)=>{
    console.log(substr.toLowerCase().split("").reduce((accum:any, item:any)=> accum &&  str.toLowerCase().includes(item), true))
}

stfn('anton', 'aanton')

// isIncludes("Incubator", "Cut") => true
// isIncludes("Incubator", "table") => false
// isIncludes("Incubator", "inbba") => true
// isIncludes("Incubator", "inba") => true
// isIncludes("Incubator", "Incubatorrr")=> true




