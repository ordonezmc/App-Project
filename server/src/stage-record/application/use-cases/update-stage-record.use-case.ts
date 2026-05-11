export class UpdateStageRecordUseCase {

  constructor(
    private repository: any
  ) {}

  async execute(
    id: string,
    data: any
  ) {

    return this.repository.update(
      id,
      data
    );
  }
}