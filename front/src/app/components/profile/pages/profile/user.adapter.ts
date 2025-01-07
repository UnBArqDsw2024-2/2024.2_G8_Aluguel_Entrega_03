export class UserAdapter {
  static adapt(apiResponse: any): any {
    return {
      name: apiResponse.name ?? '',
      email: apiResponse.email ?? '',
      site: apiResponse.site ?? '',
      phone: apiResponse.phone ?? '',
    };
  }
}
