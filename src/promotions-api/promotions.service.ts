import { Inject, Injectable } from '@nestjs/common';
import { getData } from '../common/scripts/getData';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class PromotionsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager) {}

  private readonly key = 'data';

  async findAll() {
    const dataCache = await this.cacheManager.get(this.key);

    if (dataCache) {
      return dataCache;
    }

    const data = await getData();
    await this.cacheManager.set(this.key, data, 24 * 60 * 60);

    return data;
  }

  async findOne(title: string) {}
}
