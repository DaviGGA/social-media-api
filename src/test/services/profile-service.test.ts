import { Repository } from 'typeorm';
import { expect, test, describe, beforeAll, afterAll, afterEach } from 'vitest';
import { TestDatabase } from "../../database/test-database";
import { Profile } from '../../entities/Profile';
import { ProfileService } from '../../services/profile-service';

let db: TestDatabase;
let service: ProfileService;

beforeAll(async () => {
    db = new TestDatabase();
    service = new ProfileService(db);
    await db.connectDatabase();
})

afterAll(async () => {
    await db.disconnectDatabase();
})

afterEach( async () => {
    await db.clearTable(Profile);
})


test("Create Profile", async (): Promise<void> => {
    let name: string = "John";
    let surname: string = "Doe";
    let username: string = "johnthecool"
    
    let profile: Profile = await service.createProfile(name,surname,username);

    let profileRep: Repository<Profile> = db.manager.getRepository(Profile);

    let createdProfile: Profile | null = await profileRep.findOne({
        where: {id: profile.id}
    })

    expect(profile).toEqual(createdProfile);
})