import { container } from 'tsyringe'

import IStorageProvider from './StorageContainer/models/IStorageProvider'
import DiskStorageProvider from './StorageContainer/implementations/DiskStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
