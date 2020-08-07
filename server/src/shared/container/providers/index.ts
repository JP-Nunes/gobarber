import { container } from 'tsyringe'

import IStorageProvider from './StorageContainer/models/IStorageProvider'
import DiskStorageProvider from './StorageContainer/implementations/DiskStorageProvider'

import './MailTemplateProvider'
import './MailProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
