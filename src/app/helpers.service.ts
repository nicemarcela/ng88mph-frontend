import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { ConstantsService } from './constants.service';
import { ContractService, PoolInfo } from './contract.service';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(
    public wallet: WalletService,
    public contract: ContractService,
    public constants: ConstantsService
  ) {}

  async getTokenPriceUSD(address: string): Promise<number> {
    if (
      address.toLowerCase() ===
      '0x5B5CFE992AdAC0C9D48E05854B2d91C73a003858'.toLowerCase()
    ) {
      // crvHUSD
      return 1;
    } else if (
      address.toLowerCase() ===
      '0xb19059ebb43466C323583928285a49f558E572Fd'.toLowerCase()
    ) {
      // crvHBTC
      address = '0x0316EB71485b0Ab14103307bf65a021042c6d380';
    } else if (
      address.toLowerCase() ===
      '0x2fE94ea3d5d4a175184081439753DE15AeF9d614'.toLowerCase()
    ) {
      // crvOBTC
      address = '0x8064d9Ae6cDf087b1bcd5BDf3531bD5d8C537a68';
    } else if (
      address.toLowerCase() ===
      '0x06325440D014e39736583c165C2963BA99fAf14E'.toLowerCase()
    ) {
      // CRV:STETH
      address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    } else if (
      address.toLowerCase() ===
      '0x49849C98ae39Fff122806C06791Fa73784FB3675'.toLowerCase()
    ) {
      // CRV:RENWBTC
      address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
    } else if (
      address.toLowerCase() ===
      '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3'.toLowerCase()
    ) {
      // CRV:RENWSBTC
      address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
    } else if (
      // DAI
      address.toLowerCase() ===
      this.constants.DAI[this.constants.CHAIN_ID.RINKEBY].toLowerCase()
    ) {
      address =
        this.constants.DAI[this.constants.CHAIN_ID.MAINNET].toLowerCase();
    } else if (
      // USDC
      address.toLowerCase() ===
      this.constants.USDC[this.constants.CHAIN_ID.RINKEBY].toLowerCase()
    ) {
      address =
        this.constants.USDC[this.constants.CHAIN_ID.MAINNET].toLowerCase();
    } else if (
      // SUSD
      address.toLowerCase() ===
      this.constants.SUSD[this.constants.CHAIN_ID.RINKEBY].toLowerCase()
    ) {
      address =
        this.constants.SUSD[this.constants.CHAIN_ID.MAINNET].toLowerCase();
    } else if (
      // UNI
      address.toLowerCase() ===
      this.constants.UNI[this.constants.CHAIN_ID.RINKEBY].toLowerCase()
    ) {
      address =
        this.constants.UNI[this.constants.CHAIN_ID.MAINNET].toLowerCase();
    }
    const apiStr = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}/market_chart/?vs_currency=usd&days=0`;
    const rawResult = await this.httpsGet(apiStr, 300);
    if (!rawResult.prices) {
      return 1;
    }
    return rawResult.prices[0][1];
  }

  async getHistoricalTokenPriceUSD(
    address: string,
    days: string
  ): Promise<Array<any>> {
    if (
      address.toLowerCase() ===
      '0xb19059ebb43466C323583928285a49f558E572Fd'.toLowerCase()
    ) {
      // crvHBTC
      address = '0x0316EB71485b0Ab14103307bf65a021042c6d380';
    } else if (
      address.toLowerCase() ===
      '0x2fE94ea3d5d4a175184081439753DE15AeF9d614'.toLowerCase()
    ) {
      // crvOBTC
      address = '0x8064d9Ae6cDf087b1bcd5BDf3531bD5d8C537a68';
    } else if (
      address.toLowerCase() ===
      '0x06325440D014e39736583c165C2963BA99fAf14E'.toLowerCase()
    ) {
      // CRV:STETH
      address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    } else if (
      address.toLowerCase() ===
      '0x49849C98ae39Fff122806C06791Fa73784FB3675'.toLowerCase()
    ) {
      // CRV:RENWBTC
      address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
    } else if (
      address.toLowerCase() ===
      '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3'.toLowerCase()
    ) {
      // CRV:RENWSBTC
      address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
    } else if (
      // DAI
      address.toLowerCase() ===
      this.constants.DAI[this.constants.CHAIN_ID.RINKEBY].toLowerCase()
    ) {
      address =
        this.constants.DAI[this.constants.CHAIN_ID.MAINNET].toLowerCase();
    } else if (
      // USDC
      address.toLowerCase() ===
      this.constants.USDC[this.constants.CHAIN_ID.RINKEBY].toLowerCase()
    ) {
      address =
        this.constants.USDC[this.constants.CHAIN_ID.MAINNET].toLowerCase();
    } else if (
      // SUSD
      address.toLowerCase() ===
      this.constants.SUSD[this.constants.CHAIN_ID.RINKEBY].toLowerCase()
    ) {
      address =
        this.constants.SUSD[this.constants.CHAIN_ID.MAINNET].toLowerCase();
    } else if (
      // UNI
      address.toLowerCase() ===
      this.constants.UNI[this.constants.CHAIN_ID.RINKEBY].toLowerCase()
    ) {
      address =
        this.constants.UNI[this.constants.CHAIN_ID.MAINNET].toLowerCase();
    } else if (
      address.toLowerCase() ===
      this.constants.MPH_ADDRESS[this.constants.CHAIN_ID.RINKEBY].toLowerCase()
    ) {
      address =
        this.constants.MPH_ADDRESS[
          this.constants.CHAIN_ID.MAINNET
        ].toLowerCase();
    }
    const apiStr = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}/market_chart/?vs_currency=usd&days=${days}`;
    const rawResult = await this.httpsGet(apiStr, 300);
    return rawResult.prices;
  }

  processWeb3Number(number): string {
    return new BigNumber(number).integerValue().toFixed();
  }

  async httpsGet(apiStr, cacheMaxAge: number = 60) {
    const request = await fetch(apiStr, {
      headers: { 'Cache-Control': `max-age=${cacheMaxAge}` },
    });
    return await request.json();
  }

  async getHistoricalMPHMarketCap(days: string): Promise<Array<any>> {
    const apiStr = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${
      this.constants.MPH_ADDRESS[this.constants.CHAIN_ID.MAINNET]
    }/market_chart/?vs_currency=usd&days=${days}`;
    const rawResult = await this.httpsGet(apiStr, 300);
    return rawResult.market_caps;
  }

  async getMPHPriceUSD(): Promise<BigNumber> {
    return new BigNumber(
      await this.getTokenPriceUSD(
        this.constants.MPH_ADDRESS[this.constants.CHAIN_ID.MAINNET]
      )
    );
  }

  async getMPHLPPriceUSD(): Promise<BigNumber> {
    const readonlyWeb3 = this.wallet.readonlyWeb3(
      this.constants.CHAIN_ID.MAINNET
    );
    const uniswapPair = this.contract.getNamedContract(
      'MPHLP',
      readonlyWeb3,
      this.constants.CHAIN_ID.MAINNET
    );
    const reservesObj = await uniswapPair.methods.getReserves().call();
    const ethReserve = new BigNumber(reservesObj._reserve1).div(
      this.constants.PRECISION
    );
    const ethPriceInUSD = await this.getTokenPriceUSD(this.constants.WETH_ADDR);
    const lpTotalSupply = new BigNumber(
      await uniswapPair.methods.totalSupply().call()
    ).div(this.constants.PRECISION);
    return lpTotalSupply.isZero()
      ? new BigNumber(0)
      : ethReserve.times(ethPriceInUSD).times(2).div(lpTotalSupply);
  }

  async getLPPriceUSD(lpTokenAddress: string): Promise<BigNumber> {
    const readonlyWeb3 = this.wallet.readonlyWeb3();
    const uniswapPair = this.contract.getContract(
      lpTokenAddress,
      'MPHLP',
      readonlyWeb3
    );
    const reservesObj = await uniswapPair.methods.getReserves().call();
    const token0 = await uniswapPair.methods.token0().call();
    const token1 = await uniswapPair.methods.token1().call();
    const reserve0 = new BigNumber(reservesObj._reserve0).div(
      this.constants.PRECISION
    );
    const reserve1 = new BigNumber(reservesObj._reserve1).div(
      this.constants.PRECISION
    );
    const token0PriceInUSD = await this.getTokenPriceUSD(token0);
    const token1PriceInUSD = await this.getTokenPriceUSD(token1);
    const lpTotalSupply = new BigNumber(
      await uniswapPair.methods.totalSupply().call()
    ).div(this.constants.PRECISION);
    return lpTotalSupply.isZero()
      ? new BigNumber(0)
      : reserve0
          .times(token0PriceInUSD)
          .plus(reserve1.times(token1PriceInUSD))
          .div(lpTotalSupply);
  }

  async getZCBLPPriceUSD(
    lpTokenAddress: string,
    baseTokenAddress: string
  ): Promise<BigNumber> {
    const readonlyWeb3 = this.wallet.readonlyWeb3();
    const uniswapPair = this.contract.getContract(
      lpTokenAddress,
      'MPHLP',
      readonlyWeb3
    );
    const reservesObj = await uniswapPair.methods.getReserves().call();
    const token0 = await uniswapPair.methods.token0().call();
    const token1 = await uniswapPair.methods.token1().call();
    let baseTokenReserve;
    if (token0.toLowerCase() === baseTokenAddress.toLowerCase()) {
      // base token is token0
      baseTokenReserve = new BigNumber(reservesObj._reserve0).div(
        this.constants.PRECISION
      );
    } else {
      // base token is token1
      baseTokenReserve = new BigNumber(reservesObj._reserve1).div(
        this.constants.PRECISION
      );
    }
    const baseTokenPriceInUSD = await this.getTokenPriceUSD(baseTokenAddress);
    const totalValueLocked = baseTokenReserve
      .times(baseTokenPriceInUSD)
      .times(2);
    const lpTotalSupply = new BigNumber(
      await uniswapPair.methods.totalSupply().call()
    ).div(this.constants.PRECISION);
    return lpTotalSupply.isZero()
      ? new BigNumber(0)
      : totalValueLocked.div(lpTotalSupply);
  }

  async applyFeeToInterest(
    rawInterestAmount: BigNumber,
    poolInfo: PoolInfo
  ): Promise<BigNumber> {
    const readonlyWeb3 = this.wallet.readonlyWeb3();
    const pool = this.contract.getPool(poolInfo.name, readonlyWeb3);
    const feeModelAddress = await pool.methods.feeModel().call();
    const feeModelContract = this.contract.getContract(
      feeModelAddress,
      'IFeeModel',
      readonlyWeb3
    );
    const interestAmount = this.processWeb3Number(rawInterestAmount);
    const feeAmount = await feeModelContract.methods
      .getInterestFeeAmount(poolInfo.address, interestAmount)
      .call();

    return new BigNumber(rawInterestAmount).minus(feeAmount);
  }

  applyDepositFee(rawDepositAmount, poolInfo: PoolInfo): BigNumber {
    if (!poolInfo.depositFee) {
      return rawDepositAmount;
    }
    return new BigNumber(rawDepositAmount).times(1 - poolInfo.depositFee);
  }

  parseInterestRate(oracleInterestRate: BigNumber, time: number): BigNumber {
    return new BigNumber(
      Math.pow(2, oracleInterestRate.times(time).toNumber()) - 1
    );
  }
}
