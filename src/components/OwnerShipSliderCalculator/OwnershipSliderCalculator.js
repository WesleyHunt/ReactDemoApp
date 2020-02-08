import React, { useState, useEffect } from 'react';
import currency from 'currency.js';
import styles, { dot } from './ownershipSliderCalculator.module.css'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/styles';

const ColoredSlider = withStyles({
  root: {
    width: '90%',
    alignSelf: 'center'
  },
  thumb: {
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid currentColor',
    height: 25,
    width: 25,
    bottom: -2
  },
  track: {
    color: '#00CFCC',
    height: 10,
    borderRadius: 5
  },
  rail: {
    color: '#b9b9b9',
    height: 10,
    borderRadius: 5
  }
})(Slider);

export const calculateOwnership = (initialInvestment, monthlyInvestment, yearsRenting) => {
  return (parseInt(initialInvestment, 10) + parseInt(monthlyInvestment, 10) * parseInt(yearsRenting, 10) * 12) ?? "error"
}

export const formatToCurrency = (value) => {
  return currency(value, { precision: '0' }).format()
}


const OwnershipSliderCalculator = ({ rent, initialMin, initialMax, monthlyMax, yearsMax }) => {
  const [initialInvestment, setInitialInvestment] = useState(0)
  const [monthlyInvestment, setMonthlyInvestment] = useState(0)
  const [yearsWithCompany, setYearsWithCompany] = useState(1)
  const [ownershipValue, setOwnershipValue] = useState(0)
  const [yearsLabel, setYearsLabel] = useState("year")

  useEffect(() => {
    setOwnershipValue(calculateOwnership(initialInvestment, monthlyInvestment, yearsWithCompany))
  });

  return (

    <div className={styles.container}>

      <div className={styles.greyBoldText + " " + styles.leftHeaderMarginStyling}>MONTHLY PAYMENT</div>
      <section className={styles.row + " " + styles.leftHeaderMarginStyling}>
        <div className={styles.blackText}>${formatToCurrency(rent)} +</div>
        <div className={styles.blueText} style={{ marginLeft: "5px" }}>${formatToCurrency(initialInvestment)} investment</div>
      </section>
      <div className={styles.lineDivider} />

      <div className={styles.outerContainer}>
        <div className={styles.dotContainer}>
          <dot />
          <dot />
          <dot />
          <dot />
        </div>

        <div className={styles.innerContainer}>

          <section className={styles.row}>
            <div className={styles.greyBoldText + ' ' + styles.strikeThrough + ' ' + styles.leftMarginStyling}>SECURITY DEPOSIT</div>
            <div className={styles.greyBoldText}> &#x2192; INITIAL INVESTMENT</div>
          </section>
          <div className={styles.blackText} style={{ alignSelf: 'center' }}>${formatToCurrency(initialInvestment)}</div>
          <ColoredSlider
            className={styles.slider}
            min={initialMin ?? 500}
            max={initialMax ?? 5000}
            step={25}
            onChange={(object, value) =>
              setInitialInvestment(value)
            }
          />

          <div className={styles.greyBoldText + ' ' + styles.leftTopMarginStyling}>MONTHLY INVESTMENT</div>
          <div className={styles.blackText} style={{ alignSelf: 'center' }}>${formatToCurrency(monthlyInvestment)}</div>
          <ColoredSlider
            className={styles.slider}
            min={0}
            max={monthlyMax ?? 400}
            step={5}
            onChange={(object, value) =>
              setMonthlyInvestment(value)
            }
          />

          <div className={styles.greyBoldText + ' ' + styles.leftTopMarginStyling}>YEARS WITH UP&UP</div>
          <div className={styles.blackText} style={{ alignSelf: 'center' }}>{yearsWithCompany} {yearsLabel}</div>
          <ColoredSlider
            className={styles.slider}
            min={1}
            max={yearsMax ?? 5}
            step={1}
            onChange={(object, value) => {
              setYearsWithCompany(value)
              if (value > 1) {
                setYearsLabel("years")
              } else {
                setYearsLabel("year")
              }
            }
            }
          />

          <div className={styles.greyBoldText + ' ' + styles.leftTopMarginStyling}>OWNERSHIP VALUE</div>
          <div className={styles.blueTextLarge} style={{ alignSelf: 'center', marginTop: "10px", marginBottom: "7px" }}>${formatToCurrency(ownershipValue)}</div>
          <div className={styles.blackSmallText + ' ' + styles.centerTextStyling}>
            Use your ${formatToCurrency(ownershipValue)} ownership stake as a down payment on any home, transfer it to your next up&up rental, or cash out.</div>

        </div>
      </div>
    </div>
  )
}

export default OwnershipSliderCalculator;