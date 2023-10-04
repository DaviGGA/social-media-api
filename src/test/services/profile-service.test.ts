import { log } from 'console';
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

async function createJohnDoe(): Promise<Profile> {
    let name: string = "John";
    let surname: string = "Doe";
    let username: string = "johnthecool"
    
    let profile: Profile = await service.createProfile(name,surname,username);
    return profile;
}

test("Create Profile", async (): Promise<void> => {
    let profile: Profile = await createJohnDoe();

    let profileRep: Repository<Profile> = db.manager.getRepository(Profile);

    let createdProfile: Profile | null = await profileRep.findOne({
        where: {id: profile.id}
    })
    
    expect(profile).toEqual(createdProfile);
})

test("Update Profile", async (): Promise<void> => {
    let profile: Profile = await createJohnDoe();

    profile.name = "Michael"
    profile.surname = "Jackson"
    profile.username = "kingofpop"

    let updatedProfile: Profile = await service.updateProfile(profile);

    expect(updatedProfile.name).toBe("Michael");
    expect(updatedProfile.surname).toBe("Jackson");
    expect(updatedProfile.username).toBe("kingofpop");
})

test("Get profile", async (): Promise<void> => {    
    let createdProfile: Profile = await createJohnDoe();

    let profile: Profile | null = await service.getProfile(createdProfile.id);

    expect(profile).toEqual(createdProfile);
})

test("Get all profiles", async (): Promise<void> => {
    let profile1: Profile = await service.createProfile("John","Doe","johnthecool");
    let profile2: Profile = await service.createProfile("John2","Doe2","johnthecool2");

    let profiles: Profile[] = await service.getAllProfiles();

    expect(profiles).toEqual(
        expect.arrayContaining([profile1,profile2])
    )
    
})