import Axios from "axios";
import * as samples from "./samples";
import { mocked } from "ts-jest/utils";
import { ZeplinApi } from "../src/api";
import { APIError, CLIError } from "../src/errors";

jest.mock("axios");

describe("ZeplinApi", () => {
    beforeEach(() => {
        jest.resetAllMocks();

        mocked(Axios.create).mockImplementation(() => Axios);
    });

    describe("login()", () => {
        it("returns login response when HTTP request succeeds", async () => {
            const zeplinApi = new ZeplinApi();

            mocked(Axios.post).mockResolvedValueOnce({ data: samples.loginResponse });

            await expect(zeplinApi.login(samples.loginRequest))
                .resolves
                .toBe(samples.loginResponse);

            expect(Axios.post).toHaveBeenCalledWith("/users/login", samples.loginRequest);
        });

        it("throws APIError when HTTP request fails", async () => {
            const zeplinApi = new ZeplinApi();

            mocked(Axios.post).mockRejectedValueOnce(samples.axiosError);

            await expect(zeplinApi.login(samples.loginRequest))
                .rejects
                .toThrowError(new APIError(samples.axiosError.response));

            expect(Axios.post).toHaveBeenCalledWith("/users/login", samples.loginRequest);
        });

        it("throws CLIError when non-HTTP error occurs", async () => {
            const zeplinApi = new ZeplinApi();

            const errorMessage = "some other error";
            mocked(Axios.post).mockRejectedValueOnce(new Error(errorMessage));

            await expect(zeplinApi.login(samples.loginRequest))
                .rejects
                .toThrowError(new CLIError(errorMessage));

            expect(Axios.post).toHaveBeenCalledWith("/users/login", samples.loginRequest);
        });
    });

    describe("generateToken()", () => {
        it("returns token response when HTTP request succeeds", async () => {
            const zeplinApi = new ZeplinApi();

            mocked(Axios.get).mockResolvedValueOnce({
                headers: {
                    location: "url:port?access_token=wowmuchaccesstoken"
                }
            });

            await expect(zeplinApi.generateToken(samples.loginResponse.token))
                .resolves
                .toBe("wowmuchaccesstoken");

            expect(Axios.get).toHaveBeenCalledWith(
                "/oauth/authorize",
                expect.objectContaining(samples.generateTokenAxiosRequest)
            );
        });

        it("throws APIError when HTTP request fails", async () => {
            const zeplinApi = new ZeplinApi();

            mocked(Axios.get).mockRejectedValueOnce(samples.axiosError);

            await expect(zeplinApi.generateToken(samples.loginResponse.token))
                .rejects
                .toThrowError(new APIError(samples.axiosError.response));

            expect(Axios.get).toHaveBeenCalledWith(
                "/oauth/authorize",
                expect.objectContaining(samples.generateTokenAxiosRequest)
            );
        });

        it("throws CLIError when non-HTTP error occurs", async () => {
            const zeplinApi = new ZeplinApi();

            const errorMessage = "some other error";
            mocked(Axios.get).mockRejectedValueOnce(new Error(errorMessage));

            await expect(zeplinApi.generateToken(samples.loginResponse.token))
                .rejects
                .toThrowError(new CLIError(errorMessage));

            expect(Axios.get).toHaveBeenCalledWith(
                "/oauth/authorize",
                expect.objectContaining(samples.generateTokenAxiosRequest)
            );
        });
    });

    describe("uploadConnectedComponents()", () => {
        it("resolves when HTTP request succeeds", async () => {
            const zeplinApi = new ZeplinApi();

            await zeplinApi.uploadConnectedComponents(
                samples.validJwt,
                samples.uploadParams,
                samples.connectedComponentList
            );

            const { barrelType, barrelId } = samples.uploadParams;

            expect(Axios.put).toHaveBeenCalledWith(
                `/public/cli/${barrelType}/${barrelId}/connectedcomponents`,
                samples.connectedComponentList,
                { headers: { "Zeplin-Access-Token": samples.validJwt } }
            );
        });

        it("throws APIError when HTTP request fails", async () => {
            const zeplinApi = new ZeplinApi();

            mocked(Axios.put).mockRejectedValueOnce(samples.axiosError);

            await expect(
                zeplinApi.uploadConnectedComponents(
                    samples.validJwt,
                    samples.uploadParams,
                    samples.connectedComponentList
                )
            ).rejects.toThrowError(new APIError(samples.axiosError.response));

            const { barrelType, barrelId } = samples.uploadParams;

            expect(Axios.put).toHaveBeenCalledWith(
                `/public/cli/${barrelType}/${barrelId}/connectedcomponents`,
                samples.connectedComponentList,
                { headers: { "Zeplin-Access-Token": samples.validJwt } }
            );
        });

        it("throws CLIError when non-HTTP error occurs", async () => {
            const zeplinApi = new ZeplinApi();

            const errorMessage = "some other error";
            mocked(Axios.put).mockRejectedValueOnce(new Error(errorMessage));

            await expect(
                zeplinApi.uploadConnectedComponents(
                    samples.validJwt,
                    samples.uploadParams,
                    samples.connectedComponentList
                )
            ).rejects.toThrowError(new CLIError(errorMessage));

            const { barrelType, barrelId } = samples.uploadParams;

            expect(Axios.put).toHaveBeenCalledWith(
                `/public/cli/${barrelType}/${barrelId}/connectedcomponents`,
                samples.connectedComponentList,
                { headers: { "Zeplin-Access-Token": samples.validJwt } }
            );
        });
    });
});
