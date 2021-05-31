'use strict'

document.addEventListener('DOMContentLoaded', () => {
   const selectOne = selector => document.querySelector(selector),
      selectAll = selector => document.querySelectorAll(selector)

   const fromLanguageItems = selectAll('.from-languages__item'),
      toLanguageItems = selectAll('.to-languages__item'),
      fromLanguageTextarea = selectOne('.from-textarea'),
      toLanguageTextarea = selectOne('.to-textarea')

   let selectedFromLanguageIndex = 0, selectedToLanguageIndex = 1

   if (localStorage.getItem('selectedFromLanguageIndex')) {
      selectedFromLanguageIndex = +JSON.parse(localStorage.getItem('selectedFromLanguageIndex'))
   }
   if (localStorage.getItem('selectedToLanguageIndex')) {
      selectedToLanguageIndex = +JSON.parse(localStorage.getItem('selectedToLanguageIndex'))
   }

   let fromLanguage = fromLanguageItems[selectedFromLanguageIndex].getAttribute('data-value'),
      toLanguage = toLanguageItems[selectedToLanguageIndex].getAttribute('data-value')

   function selectFromLanguage(i = selectedFromLanguageIndex) {
      fromLanguageItems.forEach(item => item.classList.remove('active'))
      fromLanguageItems[i].classList.add('active')
      selectedFromLanguageIndex = i
      fromLanguage = fromLanguageItems[selectedFromLanguageIndex].getAttribute('data-value')
      toLanguage = toLanguageItems[selectedToLanguageIndex].getAttribute('data-value')
      localStorage.setItem('selectedFromLanguageIndex', JSON.stringify(i))
   }

   function selectToLanguage(i = selectedToLanguageIndex) {
      toLanguageItems.forEach(item => item.classList.remove('active'))
      toLanguageItems[i].classList.add('active')
      selectedToLanguageIndex = i
      fromLanguage = fromLanguageItems[selectedFromLanguageIndex].getAttribute('data-value')
      toLanguage = toLanguageItems[selectedToLanguageIndex].getAttribute('data-value')
      localStorage.setItem('selectedToLanguageIndex', JSON.stringify(i))
   }

   selectFromLanguage()
   selectToLanguage()

   fromLanguageItems.forEach(async (item, index) => {
      item.addEventListener('click', e => {
         selectFromLanguage(index)
         postData(fromLanguage, toLanguage, fromLanguageTextarea.value.trim())
      })
   })

   toLanguageItems.forEach(async (item, index) => {
      item.addEventListener('click', e => {
         selectToLanguage(index)
         postData(fromLanguage, toLanguage, fromLanguageTextarea.value.trim())
      })
   })

   async function postData(fromLanguage, toLanguage, text) {
      let response = await fetch('/translate', {
         headers: {
            'Content-Type': 'application/json; charset=utf-8'
         },
         method: 'POST',
         body: JSON.stringify({
            fromLanguage, toLanguage, text
         })
      })
      response = await response.json()
      toLanguageTextarea.value = response.text
   }

   fromLanguageTextarea.addEventListener('input', async e => {
      await postData(fromLanguage, toLanguage, e.target.value.trim())
   })
})