document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const resultDiv = document.getElementById('result');
  
    // Fetch questions from the API
    fetch('https://16personalities-api.com//api/personality/questions')  // Replace with the actual endpoint
      .then(response => response.json())
      .then(data => {
        data.questions.forEach((question, index) => {
          const questionDiv = document.createElement('div');
          questionDiv.innerHTML = `
            <p>${question.text}</p>
            <input type="radio" name="q${index}" value="1"> Agree
            <input type="radio" name="q${index}" value="0"> Neutral
            <input type="radio" name="q${index}" value="-1"> Disagree
          `;
          questionsContainer.appendChild(questionDiv);
        });
      })
      .catch(error => console.error('Error fetching questions:', error));
  
    // Handle form submission
    quizForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const answers = [];
      const formData = new FormData(quizForm);
  
      formData.forEach((value, key) => {
        answers.push({ questionId: key, answer: value });
      });
  
      // Submit answers to the API
      fetch('https://16personalities-api.com/api/personality/submit', {  // Replace with the actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })
      .then(response => response.json())
      .then(data => {
        resultDiv.textContent = `Your result: ${data.personality}`;
      })
      .catch(error => console.error('Error submitting answers:', error));
    });
  });
  