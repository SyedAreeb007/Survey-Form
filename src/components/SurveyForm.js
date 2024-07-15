import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SurveyForm.css';
import logo from '../Assets/Images/logo.png';

const SurveyForm = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(null);

  const questions = [
    {
      text: "How often do you use food delivery apps?",
      options: ["Daily", "In weeks", "In months", "2-3 months"]
    },
    {
      text: "How frequently do you travel by train?",
      options: ["In weeks", "In months", "In years", "On some vacations"]
    },
    {
      text: "On a scale of 1 to 5, how satisfied are you with the current food options available on trains and train stations?",
      options: ["1", "2", "3", "4", "5"]
    },
    {
      text: "What would you prefer in food?",
      options: ["Quality over quantity", "Quantity over quality", "Cheap price over quality"]
    },
    {
      text: "How important is the packaging and presentation of food when it's delivered to you?",
      options: ["100%", "80%", "50%", "30%"]
    },
    {
      text: "What improvements would you like to see in delivery service?",
      options: ["Fast delivery", "Reasonable prices", "Varieties"]
    },
    {
      text: "Have you ever experienced any issue with food delivery?",
      options: ["Late delivery", "Wrong order", "Low quality food"]
    },
    {
      text: "Have you ever used a subscription service for food delivery?",
      options: ["Yes", "No"]
    },
    {
      text: "How likely are you to recommend your favorite food delivery to a friend?",
      options: ["Yes", "No"]
    },
    {
      text: "Have you ever influenced someone to try a specific restaurant on a food delivery platform?",
      options: ["Yes", "No"]
    },
    {
      text: "Would you be more likely to order from a food delivery service that offers exclusive deals or discounts?",
      options: ["Yes", "No"]
    },
    {
      text: "Do you use any food delivery services?",
      options: ["Yes", "No"]
    },
    {
      text: "Have you ever tried a new food delivery service based on a recommendation from friends or family?",
      options: ["Yes", "No"]
    },
    {
      text: "Would you prefer using a food delivery app or getting food by yourself?",
      options: ["By yourself", "By food delivery app"]
    },
    {
      text: "Do you trust the quality of food when ordering through a food delivery app?",
      options: ["Yes", "No"]
    }
  ];

  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const nextGroup = () => {
    setAnimationDirection("slideInRight");
    setCurrentGroupIndex(prevIndex => Math.min(prevIndex + 1, totalPages - 1));
  };

  const prevGroup = () => {
    setAnimationDirection("slideInLeft");
    setCurrentGroupIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    setSubmitted(true);

    // Store data in database
    try {
      await storeFormData(); // Updated to store the entire formData object
      console.log("Form data stored in database successfully.");
    } catch (error) {
      console.error("Failed to store form data in database:", error);
    }
  };

  const storeFormData = async () => {
    const response = await fetch('http://localhost:5000/storeFormData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        responses: questions.map((question, index) => ({
          Question: question.text,
          Answer: formData[`q${index}`]
        }))
      })
    });
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    setAnimationDirection(null);
  }, [currentGroupIndex]);

  const renderQuestions = () => {
    const startIndex = currentGroupIndex * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = questions.slice(startIndex, endIndex);

    return currentQuestions.map((question, index) => (
      <motion.div
        className="form-group"
        key={startIndex + index}
        initial={{ opacity: 0, x: animationDirection === "slideInRight" ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="question">{startIndex + index + 1}. {question.text}</label>
        {question.options.map((option, i) => (
          <div key={i} className="form-check">
            <input
              type="radio"
              id={`${startIndex + index}-${i}`}
              name={`q${startIndex + index}`}
              value={option}
              className="form-check-input"
              onChange={handleInputChange}
              required
            />
            <label htmlFor={`${startIndex + index}-${i}`} className="form-check-label">{option}</label>
          </div>
        ))}
      </motion.div>
    ));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="background"></div>
          <motion.div
            className="survey-form p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={logo}
              alt="Logo"
              className="logo"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.h1
              className="form-title"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Survey Form
            </motion.h1>
            {submitted ? (
              <motion.p
                className="form-submitted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Form Submitted!
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit}>
                {currentGroupIndex === 0 && (
                  <motion.div
                    key="personal-info"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="form-group">
                      <label htmlFor="name">Your Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact">Contact:</label>
                      <input
                        type="tel"
                        id="contact"
                        name="contact"
                        className="form-control"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </motion.div>
                )}
                {renderQuestions()}
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={prevGroup}
                    disabled={currentGroupIndex === 0}
                  >
                    Previous
                  </button>
                  {currentGroupIndex < totalPages - 1 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextGroup}
                    >
                      Next
                    </button>
                  ) : (
                    <motion.button
                      type="submit"
                      className="btn btn-success"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Submit
                    </motion.button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
