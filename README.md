<h1>압축 해제 유틸</h1>

<h2>사용법</h2>

<h3>의존성 라이브러리 설치</h3>
<pre>npm install archiver decompress</pre>

<h3>메소드 설명</h3>
<table>
  <tr>
    <td>SZip.zip(targetFolder, zipPath)</td>
    <td>
      - targetFolder는 압축할 폴더의 경로
      - zipPath는 압축 파일의 경로
    </td>
    <td>예시: SZip.zip('C:/hello/folder', 'C:/hello/world.zip')을 호출할 경우, C:/hello/folder 경로의 폴더가 압축된 파일이 C:/hello/world.zip 경로로 쓰여집니다.</td>
  </tr>

  <tr>
    <td>SZip.unZip(targetZip, dest, { overwrite: boolean })</td>
    <td>
      - target: 압축을 해제할 압축파일 경로
      - dest: 압축이 해제될 경로
      - overwrite: dest 경로의 폴더가 이미 존재할 경우 해당 폴더를 비울지 여부입니다. overwrite가 false일 경우 비우지 않습니다.
    </td>
    <td>예시: SZip.unZip('C:/hello/world.zip', 'C:/hello/here')을 호출할 경우, C:/hello/world.zip 압축 파일이 C:/hello 경로 하위에 here이라는 폴더로 압축 해제됩니다. here이라는 폴더가 존재하지 않다면 새롭게 생성합니다.</td>
  </tr>
</table>

<h3>사용 예시</h3>
아래는 C:/hello/extract_me.zip의 압축을 해제하고, 그 안에 있는 hello.txt를 읽는 코드입니다.

<pre>
  function readHello() {
    const zipPath   = 'C:/hello/extract_me.zip';
    const unzipPath = 'C:/hello/extract_me';
    const helloPath = path.join(unzipPath, 'hello.txt');
  
    // 압축해제
    await SZip.unzip(zipPath, unzipPath);

    const rs = await fs.readFile(helloPath, 'utf-8');

    console.log(rs);
  }
</pre>

아래는 C:/hello/compress_me 폴더를 extract_me.zip이라는 이름으로 압축하는 코드입니다.
<pre>
  const folderPath = 'C:/hello/compress_me';
  const zipPath    = 'C:/hello/extract_me.zip';

  console.log("압축 중");
  await SZip.zip(folderPath, zipPath);
  console.log("압축 끝");
</pre>
