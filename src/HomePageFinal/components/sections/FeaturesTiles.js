import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Saving Time & Money',
    paragraph: 'Smart Finance Omni DEX Aggregator routes trades through the cheapest path, Lowest Slippage, Smallest Price Impact, & Fastest Transaction Finality from point A to B.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
          <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src='/images/HomeImages/multichain1.svg' // eslint-disable-line global-require
                      alt="Multichain Compatible "
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Multichain Compatible 
                    </h4>
                  <p className="m-0 text-sm">
                  All the top blockchains can be accessed via Smart Finance Omni DEX, providing you multiple networks for users to seamlessly trade across.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src='/images/HomeImages/secure1.svg' // eslint-disable-line global-require
                      alt="Trustless & Secure"
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Trustless & Secure
                    </h4>
                  <p className="m-0 text-sm">
                  We have built a full on-chain trustless DEX architecture, your funds stay on the blockchain. 
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src='/images/HomeImages/swap1.svg' // eslint-disable-line global-require
                      alt="Bridge & Swap"
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Bridge & Swap
                    </h4>
                  <p className="m-0 text-sm">
                    Whether youre swapping and bridging tokens on our 7 different chains or bridging cross chain, Smart Finance provides you a one stop shop for all your DeFi needs.
                    </p>
                </div>
              </div>
            </div>



            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src='/images/HomeImages/lowest.svg' // eslint-disable-line global-require
                      alt="Lowest Slippage"
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Lowest Slippage
                    </h4>
                  <p className="m-0 text-sm">
                   Providing users with the lowest slippage through lightning fast transaction speeds both on-chain and cross chain.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src='/images/HomeImages/price1.svg' // eslint-disable-line global-require
                      alt=""
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Smallest Price Impact
                    </h4>
                  <p className="m-0 text-sm">
                    Providing users with the smallest price impact through our liquidity aggregation network.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src='/images/HomeImages/fastest1.svg' // eslint-disable-line global-require
                      alt="Fastest TX Finality"
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Fastest TX Finality
                    </h4>
                  <p className="m-0 text-sm">
                     Providing users a sub 60 second cross chain bridging solution from chain to chain. 
                    </p>
                </div>
              </div>
            </div>
  
           
          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;