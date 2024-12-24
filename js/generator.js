import { BaseClass } from "./base-class.js";


export class Generator extends BaseClass {

    _rangeStart;
    _rangeEnd;
    _sequenceLength;
    _valueDecimalState = 1;
    _valueDecimalLength = 0;
    _distribution = 1;
    _rawSequence = [];
    _sequence = []

    _distUniform = {p1: 0, p2: 0, clip: 0};
    _distNormal = {mean: 0, sd: 1, clip: 3};
    _distBeta = {alpha: 2, beta: 2, clip: 1};
    _distCauchy = {local: 0, scale: 1, clip: 4};
    _distChiSquare = {dof: 4, p2: 0, clip: 8};
    _distGamma = {shape: 9, scale: 0.5, clip: 16};
    _distInvGamma = {alpha: 1, beta: 1, clip: 3};
    _distLogNormal = {mu: 0, sigma: 0.25, clip: 2.5};
    _distStudentt = {dof: 1, p2: 0, clip: 3};
    _distWeibull = {shape: 1.5, scale: 1, clip: 3.5};

    _active = false;

    set Active(value) {
        this._active = value;
        if (this._active) {
            this.GenerateRawValues();
        }
    }

    get RangeStart() {
        return this._rangeStart;
    }
    set RangeStart(value) {
        this._rangeStart = value;
        this.GenerateRawValues();
    }   

    get RangeEnd() {
        return this._rangeEnd;
    }
    set RangeEnd(value) {
        this._rangeEnd = value;
        this.GenerateRawValues();
    }

    set SequenceLength(value) {
        this._sequenceLength = value;
        this.GenerateRawValues();
    }

    get ValueDecimalState() {
        return this._valueDecimalState;
    }
    set ValueDecimalState(value) {
        this._valueDecimalState = value;
        this.GenerateValues();
    }

    get ValueDecimalLength() {
        return this._valueDecimalLength;
    }
    set ValueDecimalLength(value) {
        this._valueDecimalLength = value;
        this.GenerateValues();
    }

    set Distribution(value) {
        this._distribution = value;
        this.GenerateRawValues();
    }

    get RandomSequence() {
        return this._sequence;
    }

    get RawRandomSequence() {
        return this._rawSequence;
    }

    get RandomValue() {
        return this._rawSequence[0]
        //return this.GenerateRandomFloatValue();
    }

    get FirstParameter() {
        if (this._distribution == 2) {
            return this._distNormal.mean;
        }
        else if (this._distribution == 3) {
            return this._distBeta.alpha;
        }
        else if (this._distribution == 4) {
            return this._distCauchy.local;
        }
        else if (this._distribution == 5) {
            return this._distChiSquare.dof;
        }
        else if (this._distribution == 6) {
            return this._distGamma.shape;
        }
        else if (this._distribution == 7) {
            return this._distInvGamma.alpha;
        }
        else if (this._distribution == 8) {
            return this._distLogNormal.mu;
        }
        else if (this._distribution == 9) {
            return this._distStudentt.dof;
        }
        else if (this._distribution == 10) {
            return this._distWeibull.shape;
        }
    }

    set FirstParameter(value) {
        if (this._distribution == 2) {
            this._distNormal.mean = value;
        }
        else if (this._distribution == 3) {
            this._distBeta.alpha = value;
        }
        else if (this._distribution == 4) {
            this._distCauchy.local = value;
        }
        else if (this._distribution == 5) {
            this._distChiSquare.dof = value;
        }
        else if (this._distribution == 6) {
            this._distGamma.shape = value;
        }
        else if (this._distribution == 7) {
            this._distInvGamma.alpha = value;
        }
        else if (this._distribution == 8) {
            this._distLogNormal.mu = value;
        }
        else if (this._distribution == 9) {
            this._distStudentt.dof = value;
        }
        else if (this._distribution == 10) {
            this._distWeibull.shape = value;
        }
        this.GenerateRawValues();
    }

    get SecondParameter() {
        if (this._distribution == 2) {
            return Math.sqrt(this._distNormal.sd);
        }
        else if (this._distribution == 3) {
            return this._distBeta.beta;
        }
        else if (this._distribution == 4) {
            return this._distCauchy.scale;
        }
        else if (this._distribution == 5) {
            return this._distChiSquare.p2;
        }
        else if (this._distribution == 6) {
            return this._distGamma.scale;
        }
        else if (this._distribution == 7) {
            return this._distInvGamma.beta;
        }
        else if (this._distribution == 8) {
            return this._distLogNormal.sigma;
        }
        else if (this._distribution == 9) {
            return this._distStudentt.p2;
        }
        else if (this._distribution == 10) {
            return this._distWeibull.scale;
        }
    }

    set SecondParameter(value) {
        if (this._distribution == 2) {
            this._distNormal.sd = Math.pow(value, 2);
        }
        else if (this._distribution == 3) {
            this._distBeta.beta = value;
        }
        else if (this._distribution == 4) {
            this._distCauchy.scale = value;
        }
        else if (this._distribution == 6) {
            this._distGamma.scale = value;
        }
        else if (this._distribution == 7) {
            this._distInvGamma.beta = value;
        }
        else if (this._distribution == 8) {
            this._distLogNormal.sigma = value;
        }
        else if (this._distribution == 9) {
            this._distStudentt.p2 = value;
        }
        else if (this._distribution == 10) {
            this._distWeibull.scale = value;
        }

        this.GenerateRawValues();
    }

    get ThirdParameter() {
        if (this._distribution == 2) {
            return this._distNormal.clip;
        }
        else if (this._distribution == 3) {
            return this._distBeta.clip;
        }
        else if (this._distribution == 4) {
            return this._distCauchy.clip;
        }
        else if (this._distribution == 5) {
            return this._distChiSquare.clip;
        }
        else if (this._distribution == 6) {
            return this._distGamma.clip;
        }
        else if (this._distribution == 7) {
            return this._distInvGamma.clip;
        }
        else if (this._distribution == 8) {
            return this._distLogNormal.clip;
        }
        else if (this._distribution == 9) {
            return this._distStudentt.clip;
        }
        else if (this._distribution == 10) {
            return this._distWeibull.clip;
        }
    }

    set ThirdParameter(value) {
        if (this._distribution == 2) {
            this._distNormal.clip = value;
        }
        else if (this._distribution == 3) {
            this._distBeta.clip = value;
        }
        else if (this._distribution == 4) {
            this._distCauchy.clip = value;
        }
        else if (this._distribution == 5) {
            this._distChiSquare.clip = value;
        }
        else if (this._distribution == 6) {
            this._distGamma.clip = value;
        }
        else if (this._distribution == 7) {
            this._distInvGamma.clip = value;
        }
        else if (this._distribution == 8) {
            this._distLogNormal.clip = value;
        }
        else if (this._distribution == 9) {
            this._distStudentt.clip= value;
        }
        else if (this._distribution == 10) {
            this._distWeibull.clip = value;
        }
        this.GenerateRawValues();
    }


    constructor() {
        super();
    }

    GenerateRawValues() {

        if (this._active == false) {
            return;
        }

        if (this._distribution == 1) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                return jStat.uniform.sample(this._rangeStart, this._rangeEnd);
            });
        }
        else if (this._distribution == 2) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                let value = 0;
                do {
                    value = jStat.normal.sample(this._distNormal.mean, this._distNormal.sd);
                    value /= this._distNormal.clip * 2 
                    value += 0.5;
                } while( value < 0 || value >= 1 )
                value *= this._rangeEnd - this._rangeStart;
                value += this._rangeStart;
                return value;
            });
        }
        else if (this._distribution == 3) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                let value = jStat.beta.sample( this._distBeta.alpha, this._distBeta.beta );
                value *= this._rangeEnd - this._rangeStart;
                value += this._rangeStart;
                return value;
            });
        }
        else if (this._distribution == 4) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                let value = 0;
                do {
                    value = jStat.cauchy.sample( this._distCauchy.local, this._distCauchy.scale );
                    value /= this._distCauchy.clip * 2;
                    value += 0.5;
                } while ( value < 0 || value >= 1 )
                value *= this._rangeEnd - this._rangeStart;
                value += this._rangeStart;
                return value;
            });
        }
        else if (this._distribution == 5) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                let value = 0;
                do {
                    value = jStat.chisquare.sample(this._distChiSquare.dof);
                    value /= this._distChiSquare.clip;
                } while ( value < 0 || value >= 1 )
                value *= this._rangeEnd - this._rangeStart;
                value += this._rangeStart;
                return value;
            });
        }
        else if (this._distribution == 6) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                let value = 0;
                do {
                    value = jStat.gamma.sample(this._distGamma.shape, this._distGamma.scale );
                    value /= this._distGamma.clip;
                } while ( value < 0 || value >= 1 )
                value *= this._rangeEnd - this._rangeStart;
                value += this._rangeStart;
                return value;
            });
        }
        else if (this._distribution == 7) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                let value = 0;
                do {
                    value = jStat.invgamma.sample( this._distInvGamma.alpha, this._distInvGamma.beta );
                    value /= this._distInvGamma.clip;
                } while ( value < 0 || value >= 1 )
                value *= this._rangeEnd - this._rangeStart;
                value += this._rangeStart;
                return value;
            });
        }
        else if (this._distribution == 8) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                let value = 0;
                do {
                    value = jStat.lognormal.sample( this._distLogNormal.mu, this._distLogNormal.sigma);
                    value /= this._distLogNormal.clip;
                } while ( value < 0 || value >= 1 )
                value *= this._rangeEnd - this._rangeStart;
                value += this._rangeStart;
                return value;
            });
        }
        else if (this._distribution == 9) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                let value = 0;
                do {
                    value = jStat.studentt.sample( this._distStudentt.dof);
                    value /= this._distStudentt.clip * 2;
                    value += 0.5;
                } while ( value < 0 || value >= 1 )
                value *= this._rangeEnd - this._rangeStart;
                value += this._rangeStart;
                return value;
            });
        }
        else if (this._distribution == 10) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                let value = 0;
                do {
                    value = jStat.weibull.sample( this._distWeibull.scale, this._distWeibull.shape);
                    value /= this._distLogNormal.clip;
                } while ( value < 0 || value >= 1 )
                value *= this._rangeEnd - this._rangeStart;
                value += this._rangeStart;
                return value;
            });
        }

        this.GenerateValues();
    }

    GenerateValues() {
        this._sequence = this._rawSequence.map(value => this.TruncateValue(value));
        // for (let i = 0; i < this._sequenceLength; i++) {
        //     let value = this._rawSequence[i];
        //     value = this.TruncateValue(value);
        //     this._sequence.push(value);
        // }
        this.DispatchEvent("SequenceChanged");
    }

    TruncateValue(value) {
        if (this._valueDecimalState == 1) {
            if (this._valueDecimalLength == 0) {
                return Math.floor(value);
            }
            const multiplier = Math.pow(10, this._valueDecimalLength);
            return Math.floor(value * multiplier) / multiplier;
        }
        else if (this._valueDecimalState == 2) {
            return value.toFixed(this._valueDecimalLength)
        }
        else if (this._valueDecimalState == 3) {
            if (this._valueDecimalLength == 0) {
                return 0;
            }
            return value.toPrecision(this._valueDecimalLength);
        }
    }

    // GenerateRandomFloatValue(x = Math.random()) {

    //     let value = x;

    //     if (this._distribution == 2) {
    //         this._rawSequence = Array.from({length: this._sequenceLength}, () => {
    //             let value = jStat.normal.sample(this._distNormalMean, this._distNormalStd) / 6 + 0.5;
    //             value *= this._rangeEnd - this._rangeStart;
    //             value += this._rangeStart;
    //             return value;
    //         });
    //     }
    //     else if (this._distribution == 3) {
    //         value = jStat.beta.sample( this._distBetaAlpha, this._distBetaBeta );
    //     }
    //     else if (this._distribution == 4) {
    //         value = jStat.cauchy.sample( this._distCauchyLocal, this._distCauchyScale );
    //     }
    //     else if (this._distribution == 5) {
    //         value = jStat.chisquare.cdf( value, this._distChiSquareDof);
    //     }
    //     else if (this._distribution == 6) {
    //         value = jStat.gamma.cdf( value, this._distGammaShape, this._distGammaScale );
    //     }
    //     else if (this._distribution == 7) {
    //         value = jStat.invgamma.cdf( value, this._distInvGammaShape, this._distInvGammaScale );
    //     }
    //     else if (this._distribution == 8) {
    //         value = jStat.lognormal.cdf( value, this._distLogNormalMu, this._distLogNormalSignal);
    //     }
    //     else if (this._distribution == 9) {
    //         value = jStat.pareto.cdf( value, this._distParetoScale, this._distParetoShape);
    //     }
    //     else if (this._distribution == 10) {
    //         value = jStat.weibull.cdf( value, this._distWeibullScale, this._distWeibullShape);
    //     }

    //     value *= this._rangeEnd - this._rangeStart;
    //     value += this._rangeStart;

    //     return value;
    // }

    // UniformDistribution() {
    //     return Math.random();
    // }   

    // NormalDistributionSd1() {
    //     let u = 0, v = 0;
    //     while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    //     while(v === 0) v = Math.random();
    //     let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    //     num = num / 10.0 + 0.5; // Translate to 0 -> 1
    //     if (num > 1 || num < 0) return this.NormalDistributionSd1() // resample between 0 and 1
    //     return num
    // }

    // NormalizeNormalDistribution() {
    //     let x0 = this.NormalDistribution(0.0000000001);
    //     let x1 = this.NormalDistribution(1);

    //     console.log(x0, x1);
    // }


    // NormalDistribution(x = -1) {
    //     let u = x;
    //     let v = x;
    //     if (x === -1) {
    //         do {
    //             u = Math.random();
    //         } while (u === 0);
    //         do {
    //             v = Math.random();
    //         } while (v === 0);
    //     }

    //     let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    //     num /= 10;
    //     num += 2;
    //     //if (num > 1 || num < 0) return this.NormalDistribution() // resample between 0 and 1
    //     return num * this._sd + this._mean;

    //     var m = this._sd * Math.sqrt(2 * Math.PI);
    //     var e = Math.exp(-Math.pow(x - this._mean, 2) / (2 * this._variance));
    //     console.log(e / m);
    //     return e / m;

    //     if (x === -1) {
    //         do {
    //             x = Math.random();
    //         } while (x === 0);
    //     }
    //     //let num = Math.exp(this._HALF_TWO_PI_LOG - Math.log(this._sd) - Math.pow(x - this._mean, 2)) / (2 * this._variance);
    //     return num
    // }



    // BetaDistribution() {
        
    //     return Math.exp(this.BetaLog1(Math.random(), 10, 10))
    // }

    // BetaLog1(x, a, b) {
    //     return ((a-1)*Math.log(x) + (b-1)*Math.log(1-x)) - this.BetaLog2(a,b)
    // }

    // BetaLog2(a, b) {
    //     let foo = 0.0;
    
    //     for (let i=0; i<a-2; i++) {
    //         foo += Math.log(a-1-i);
    //     }
    //     for (let i=0; i<b-2; i++) {
    //         foo += Math.log(b-1-i);
    //     }
    //     for (let i=0; i<a+b-2; i++) {
    //         foo -= Math.log(a+b-1-i);
    //     }
    //     return foo
    // }

    // BetaDistribution3() {
    //     return jStat.beta.cdf( Math.random(), this._distBetaAlpha, this._distBetaBeta );
    // }

    // BetaDistribution2() {
    //     const alpha = this._distBetaAlpha;
    //     const beta = this._distBetaBeta;
    //     const uniform = Math.random();
    //     const s = alpha + beta;

    //     const bt = Math.exp(this.LogGamma(s) - this.LogGamma(beta) - this.LogGamma(alpha) + alpha * Math.log(uniform) + beta * Math.log(1 - uniform));
    //         //             BT=exp(LogGamma(S)-LogGamma(B)-LogGamma(A)+A*log(Z)+B*log(1-Z));


    //     let BetaCDF = 0;
    //     if (uniform < (alpha + 1) / (s + 2)) {
    //         BetaCDF = bt * this.Betinc(uniform, alpha, beta);
    //     } else {
    //         BetaCDF = 1 - bt * this.Betinc(1 - uniform, alpha, beta);
    //     }
    //     BetaCDF += +.000005;

    //     if (BetaCDF > 1) {
    //         BetaCDF = this.BetaDistribution2();
    //     }
    //     else if (BetaCDF < 0) {
    //         BetaCDF = this.BetaDistribution2();
    //     }

    //     return BetaCDF;
    // }

    // LogGamma(z) {
    //     const s = 1 + 76.18009173 / z - 86.50532033 / (z + 1) + 24.01409822 / (z + 2) - 1.231739516 / (z + 3) + .00120858003 / (z + 4) - .00000536382 / (z + 5);
    //     //var S=    1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) + .00120858003 / (Z + 4) - .00000536382 / (Z + 5);

    //     return (z - 0.5) * Math.log(z + 4.5) - (z + 4.5) + Math.log(s * 2.50662827465);
    //     //var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
    // }

    // Betinc(uniform, alpha, beta) {
    //     let alpha0 = 0, beta0 = 1;
    //     let alpha1 = 1, beta1 = 1;
    //     let m9 = 0;
    //     let alpha2 = 0;
    //     let c9;

    //     while (Math.abs((alpha1 - alpha2) / alpha1) > .00001) {
    //         alpha2 = alpha1;
    //         c9 = -(alpha + m9) * (alpha + beta + m9) * uniform / (alpha + 2 * m9) / (alpha + 2 * m9 + 1);
    //         alpha0 = alpha1 + c9 * alpha0;
    //         beta0 = beta1 + c9 * beta0;
    //         m9 += 1;
    //         c9 = m9 * (beta - m9) * uniform / (alpha + 2 * m9 - 1) / (alpha + 2 * m9);
    //         alpha1 = alpha0 + c9 * alpha1;
    //         beta1 = beta0 + c9 * beta1;
    //         alpha0 = alpha0 / beta1;
    //         beta0 = beta0 / beta1;
    //         alpha1 = alpha1 / beta1;
    //         beta1 = 1;
    //     }

    //     return alpha1 / alpha;
    // }

    

    // function Betinc(X,A,B) {
    //     var A0=0;
    //     var B0=1;
    //     var A1=1;
    //     var B1=1;
    //     var M9=0;
    //     var A2=0;
    //     var C9;
    //     while (Math.abs((A1-A2)/A1)>.00001) {
    //         A2=A1;
    //         C9=-(A+M9)*(A+B+M9)*X/(A+2*M9)/(A+2*M9+1);
    //         A0=A1+C9*A0;
    //         B0=B1+C9*B0;
    //         M9=M9+1;
    //         C9=M9*(B-M9)*X/(A+2*M9-1)/(A+2*M9);
    //         A1=A0+C9*A1;
    //         B1=B0+C9*B1;
    //         A0=A0/B1;
    //         B0=B0/B1;
    //         A1=A1/B1;
    //         B1=1;
    //     }
    //     return A1/A
    // }
    
    // function compute(form) {
    //     Z=eval(form.argument.value)
    //     A=eval(form.alpha.value)
    //     B=eval(form.beta.value)
    //     with (Math) {
    //         if (A<=0) {
    //             alert("alpha must be positive")
    //         } else if (B<=0) {
    //             alert("beta must be positive")
    //         } else if (Z<=0) {
    //             Betacdf=0
    //         } else if (Z>=1) {
    //             Betacdf=1
    //         } else {
    //             S=A+B;
    //             BT=exp(LogGamma(S)-LogGamma(B)-LogGamma(A)+A*log(Z)+B*log(1-Z));
    //             if (Z<(A+1)/(S+2)) {
    //                 Betacdf=BT*Betinc(Z,A,B)
    //             } else {
    //                 Betacdf=1-BT*Betinc(1-Z,B,A)
    //             }
    //         }
    //         Betacdf=Betacdf+.000005
    //         s=" "+Betacdf
    //         s=s.substr(0,8);
    //     }
    //     form.result.value = s;
    // }



    // function LogGamma(Z) {
    //     with (Math) {
    //         var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
    //         var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
    //     }
    //     return LG
    // }
}