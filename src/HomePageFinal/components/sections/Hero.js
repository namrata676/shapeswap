import React, { useState } from 'react';
import {useHistory} from "react-router-dom"
import styled from 'styled-components'
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Heading = styled.h1`
font-size: 50px !important;
`

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);
  const navigate = useHistory();

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <Heading className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
             Multi-Chain <br/><span className="text-color-primary"><Heading style={{color: "#086fe4"}}>Decentralized Exchange</Heading></span>
            </Heading>
            <div className="container-s">              
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                  Smart Finance is bringing capital efficiency into the fragmented blockchain ecosystem. <br/>
                  With the launch of our Omni-Dex, we are laying the foundation for complete blockchain interoperability. <br/>
                  Our product line enables lowest slippage, smallest price impact and lightning speed transaction finality from point A to B.   
              </p>
              
              <div className="mt-2 reveal-from-bottom" data-reveal-delay="600">
             { /* <img src={require('./../../assets/images/logosf.png')} alt="Smart Finance" style={{width:'20%', paddingBottom: '15px'}}/>  */ }
                <ButtonGroup>
                  <Button tag="a" color="primary" onClick={()=>navigate.push("/swap")} target="_blank">
                    Launch Dapp
                    </Button>
                </ButtonGroup>                
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://www.youtube.com/embed/KVymmHLjO64"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src='/images/HomeImages/video-placeholder.png' // eslint-disable-line global-require
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://www.youtube.com/embed/KVymmHLjO64"
            videoTag="iframe" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;