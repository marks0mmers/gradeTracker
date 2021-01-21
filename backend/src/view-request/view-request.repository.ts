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
        const viewRequest = await viewRequestDatabase.findById(viewRequestDTO._id);
        viewRequest.status = viewRequestDTO.status;
        viewRequest.requester = viewRequestDTO.requester;
        viewRequest.receiver = viewRequestDTO.receiver;
        return await viewRequest.save();
    }

    public async delete(id: string): Promise<ViewRequestDTO> {
        return await viewRequestDatabase.findByIdAndDelete(id);
    }

}
