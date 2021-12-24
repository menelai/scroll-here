export abstract class HasUnsavedDataConfirmService {

  abstract confirm(message: string, title?: string, ok?: string, cancel?: string): Promise<boolean> | boolean;
}
