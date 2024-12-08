import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Access aggregated liquidity from all top volume DEXs',
    paragraph: 'Bridging all your favorite Dapps under one roof for streamlined ease of access'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
              { /* 
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                </div> 
                */}
                <h3 className="mt-0 mb-12">
                  Available On-Chain Networks
                  </h3>
                <p className="m-0">
                Smart Finance Omni DEX provides the ability to Swap/Bridge any tokens/coins from all of the top blockchain networks all from our easy-to-use Dapp! If you trade or move money in DEFI, then you know how frustrating it is to have to wait more than a few minutes for transactions to clear and show up as available, add networks to MetaMask manually,  manage all your wallet connections while trying to meet deadlines and or make a profit at the same time. Not to mention the ridiculous Slippage and horrible transaction fees…

                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src='/images/HomeImages/features-split-image-01.png' // eslint-disable-line global-require
                  alt="Features split 01"
                  width={528}
                  height={396} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
               { /* } 
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                </div> 
                */ } 
                <h3 className="mt-0 mb-12">
                  Cross Chain Capability
                  </h3>
                <p className="m-0">
                Smart Finance has created a secure On-Chain solution for Cross-Chain Bridging that allows DeFi traders to quickly Bridge their coins through the Omni DEX onto any other supported network such as ETH, AVAX, POLY, BNB, etc. The Smart Finance multi-chain decentralized exchange enables fast, efficient, & highly secure liquidity aggregation for all users without needing to convert to stables or wrapped tokens prior to bridging! 
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src='/images/HomeImages/features-split-image-02.png' // eslint-disable-line global-require
                  alt="Features split 02"
                  width={528}
                  height={396} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
              { /* 
                 <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow 
                  </div>
              */ }
                <h3 className="mt-0 mb-12">
                  Smart Scalability
                  </h3>
                <p className="m-0">
                 The Omni DEX has provided the foundation for Smart Finance to scale and innovate in areas never-before-seen, with brand new products for the crypto space. This also allows room for DeFi as a whole to evolve & create a better user experience in Web3 for the masses! Many future development plans for a Smart Finance include a Digital Payment gateway, Cross-Chain commodity transfers, asset management, and many other DeFi solutions!   
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src='/images/HomeImages/features-split-image-03.png' // eslint-disable-line global-require
                  alt="Features split 03"
                  width={528}
                  height={396} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;