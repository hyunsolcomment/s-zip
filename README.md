<h1>압축 해제 유틸</h1>

<h2>사용법</h2>

<h3>의존성 라이브러리 설치</h3>
<pre>npm install archiver decompress</pre>

<h3>메소드 설명</h3>
<table>
  <tr>
    <td>SZip.zip(targetFolder, zipPath)</td>
    <td>targetFolder는 압축할 폴더의 경로, zipPath는 압축 파일의 경로입니다.</td>
    <td>예시: SZip.zip('C:/hello/folder', 'C:/hello/world.zip')을 호출할 경우, C:/hello/folder 경로의 폴더가 압축된 파일이 C:/hello/world.zip 경로로 쓰여집니다.</td>
  </tr>

  <tr>
    <td>SZip.unZip(targetZip, dest, { overwrite: boolean })</td>
    <td>target는 압축을 해제할 압축파일 경로, dest는 압축이 해제될 경로입니다. overwrite는 dest 경로의 폴더가 이미 존재할 경우 해당 폴더를 비울지 여부입니다. overwrite가 false일 경우 비우지 않습니다.</td>
    <td>예시: SZip.unZip('C:/hello/world.zip', 'C:/hello/here')을 호출할 경우, C:/hello/world.zip 압축 파일이 C:/hello 경로 하위에 here이라는 폴더로 압축 해제됩니다. here이라는 폴더가 존재하지 않다면 새롭게 생성합니다.</td>
  </tr>
</table>

