import React from 'react';
import { motion } from 'framer-motion';
import './SurveyForm.css';
import logo from '../Assets/Images/logo.png'; // Adjust the path based on your project structure

const SurveyForm = () => {
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
            <img src={logo} alt="Logo" className="logo" /> {/* Logo before the title */}
            <h1 className="form-title">Survey Form</h1>
            <form>
              {questions.map((question, index) => (
                <motion.div
                  className="form-group"
                  key={index}
                  initial={{ x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <label className="question">{index + 1}. {question.text}</label>
                  {question.options.map((option, i) => (
                    <div key={i} className="form-check">
                      <input type="radio" id={`${index}-${i}`} name={`q${index}`} value={option} className="form-check-input" />
                      <label htmlFor={`${index}-${i}`} className="form-check-label">{option}</label>
                    </div>
                  ))}
                </motion.div>
              ))}
              <motion.button
                type="submit"
                className="submit-button btn btn-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

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

export default SurveyForm;
