import React from 'react';
import CONSTANTS from '../../constants';
import { contestStepsData } from './contestStepsData';
import styles from './ContestSteps.module.sass';

export default function ContestSteps () {
  return (
    <>
      {contestStepsData.map(contestStep => (
        <div
          key={contestStep.title}
          className={`${
            contestStep.id == 1
              ? styles.whiteContainer
              : contestStep.id == 2
              ? styles.greenContainer
              : contestStep.id == 3
              ? styles.greyContainer
              : ''
          }`}
        >
          <div
            className={`${
              contestStep.id % 2 ? styles.step : styles.stepReverse
            } `}
          >
            <div className={`${contestStep.id == 2 ? styles.greenStep : ''}`}>
              <h3>{contestStep.title}</h3>
              <ul>
                {contestStep.steps.map((step, index) => (
                  <li key = {index}>
                    <p>
                      <i className='fas fa-check' />
                      {step}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}${contestStep.image.src}`}
              alt={`${contestStep.image.alt}`}
            />
          </div>
        </div>
      ))}
    </>
  );
}
