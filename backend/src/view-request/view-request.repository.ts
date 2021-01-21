import { injectable } from "inversify";
import { viewRequestDatabase, ViewRequestDocument, ViewRequestDTO } from "./view-request.schema";

export interface ViewRequestRepository {
    findAll(): Promise<ViewRequestDTO[]>;
    find(id: string): Promise<ViewRequestDTO>;
    create(viewRequestDTO: ViewRequestDTO): Promise<ViewRequestDTO>;
    update(viewRequestDTO: ViewRequestDTO): Promise<ViewRequestDTO>;
    delete(id: string): Promise<ViewRequestDTO>;
}

@injectable()
export class ViewRequestRepositoryImpl implements ViewRequestRepository {
    public async findAll(): Promise<ViewRequestDTO[]> {
        return await viewRequestDatabase.find();
    }

    public async find(id: string): Promise<ViewRequestDTO> {
        return await viewRequestDatabase.findById(id);
    }

    public async create(viewRequestDTO: ViewRequestDTO): Promise<ViewRequestDTO> {
        return await viewRequestDatabase.create(viewRequestDTO);
    }

    public async update(viewRequestDTO: ViewRequestDTO): Promise<ViewRequestDTO> {
        return await viewRequestDatabase.findByIdAndUpdate(viewRequestDTO._id, viewRequestDTO, (err: Error, res: ViewRequestDocument) => res);
    }

    public async delete(id: string): Promise<ViewRequestDTO> {
        return await viewRequestDatabase.findByIdAndDelete(id);
    }

}
