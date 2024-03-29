import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';
import decompress from 'decompress';

/*
    SZip
    
    >> 사용 전 터미널 입력: npm install archiver decompress
*/
export class SZip {

    private static async emptyDir(dir: string) {
        try {
            const files = await fs.promises.readdir(dir);
            
            const deleteNext = async () => {
                const filePath = files.pop();
                if (!filePath) {
                    // 모든 파일 삭제 완료
                    return;
                }
    
                const fullPath = path.join(dir, filePath);
                const stat = await fs.promises.stat(fullPath);
    
                if (stat.isDirectory()) {
                    // 디렉토리인 경우 재귀적으로 비우기
                    await SZip.emptyDir(fullPath);
                } else {
                    // 파일인 경우 삭제
                    await fs.promises.unlink(fullPath);
                }
    
                // 파일 삭제 후 다음 파일 삭제
                await deleteNext();
            };
    
            // 첫 번째 파일 삭제 시작
            await deleteNext();
        } catch (err) {
            throw err;
        }
    }

    /**
     * 특정 폴더 압축
     * @param targetFolder 압축할 폴더 경로
     * @param zipPath 압축 파일 생성 경로
     */
    static async zip(targetFolder: string, zipPath: string) {

        const output  = fs.createWriteStream(zipPath)
        const archive = archiver('zip', {
            zlib: { level: 9 }
        })
        archive.pipe(output);

        return new Promise((resolve, reject) => {
            fs.readdir(targetFolder, { withFileTypes: true }, async (err, files) => {
                if (err) {
                    throw err;
                }

                for (let file of files) {
                    
                    const name = file.name;
                    const filePath = path.join(targetFolder, name);

                    if (file.isDirectory()) {
                        archive.directory(filePath, name);
                    } 
                    
                    else if (file.isFile()) {
                        archive.file(filePath, { name: name });
                    }
                }

                // 압축 실행
                archive.finalize();

                archive.on('finish', () => {
                    resolve(null);
                });

                archive.on('error', (err) => {
                    reject(err);
                })
            });
        });
    }

    /**
     * 압축 해제
     * @param targetFolder 압축 파일 경로
     * @param dest 압축 해제될 폴더 경로 (해당하는 경로인 폴더가 없을 경우, 폴더를 생성합니다.)
     * @param options overwrite: 압축이 해제될 경로에 폴더가 이미 존재할 경우 안의 내용물을 삭제하고 덮을 것인지에 대한 여부입니다. false일 경우 압축이 해제될 위치에 폴더가 존재할 경우, 압축을 해제하지 않습니다. true일 경우 해당 폴더 안에 있는 파일을 모두 삭제 후 해당 폴더 안에 압축을 해제합니다.
     */
    static async unZip(targetZip: string, dest: string, options?: { overwrite?: boolean }) {

        options = options ?? {};

        async function exist(path) {
            return new Promise((resolve, reject) => {
                try {
                    fs.stat(path, (err) => {
                        if(err) {
                            resolve(false);
                            return;
                        }

                        resolve(true);
                    });
                    return true; // 파일 또는 폴더가 존재함
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        resolve(false);
                    } else {
                        reject(err);
                    }
                }
            })
        }

        function mkdir(path: string) {
            return new Promise((resolve, reject) => {
                fs.mkdir(path, () => {
                    resolve(null);
                })
            })
        }

        return new Promise(async (resolve, reject) => {

            if(!await exist(dest)) {
                await mkdir(dest);    
            } else {
                if(options.overwrite) {
                    await SZip.emptyDir(dest);
                }
            }

            decompress(targetZip, dest).then(
                () => {
                    resolve(null);
                },
                (err) => {
                    reject(err);
                }
            );
        })
    }
}