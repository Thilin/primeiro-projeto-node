import {container} from "tsyringe";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "@shared/container/providers/StorageProvider/implementations/DiskStorageProvider";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import EtherealMailPRovider from "@shared/container/providers/MailProvider/implementations/EtherealMailPRovider";

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider', new EtherealMailPRovider(),
);
